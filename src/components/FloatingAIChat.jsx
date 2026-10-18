import React, { useCallback, useEffect, useRef, useState } from 'react';

import axios from 'axios';

import '../styles/FloatingAIChat.css';

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

const API_URL = process.env.REACT_APP_API_URL || 'http\://localhost:5000/api';

const CONVERSATION_KEY = 'capwareAIConversationId';

const OWNER_KEY = 'capwareAIChatOwnerKey';

const getCurrentUser = () => {

  try {

    return JSON.parse(localStorage.getItem("capwareUser") || "null");

  } catch {

    return null;

  }

};

const getWelcomeMessage = (user) => {

  const username = user?.name?.trim();

  return username

    ? `Hello ${username}! 👋 How can I help you today?`

    : "Hi there! 👋 How can I help you today?";

};

const makeWelcomeMessage = (user) => ({
  role: "assistant",
  content: getWelcomeMessage(user),
});

const prompts = [

  'What services do you offer?',

  'Tell me about internships',

  'I need final-year project guidance',

  'Talk to your support team',

];

function getHeaders() {

  const headers = {};

  const token = localStorage.getItem('capwareToken');

  const ownerKey = localStorage.getItem(OWNER_KEY);

  if (token) headers.Authorization = `Bearer ${token}`;

  if (ownerKey) headers['x-chat-owner-key'] = ownerKey;

  return headers;

}

export default function FloatingAIChat() {

  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [messages, setMessages] = useState(() => [makeWelcomeMessage(getCurrentUser())]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [conversationId, setConversationId] = useState(

    () => localStorage.getItem(CONVERSATION_KEY) || ''

  );

  const [error, setError] = useState('');

  const [language, setLanguage] = useState('English');

  const [showLead, setShowLead] = useState(false);

  const [lead, setLead] = useState({

    name: '',

    email: '',

    phone: '',

    interest: 'General enquiry',

    message: '',

    consentToContact: false,

  });

  const [leadStatus, setLeadStatus] = useState('');

  const [leadSending, setLeadSending] = useState(false);

  const listRef = useRef(null);

  const inputRef = useRef(null);

  const recognitionRef = useRef(null);

  const scrollToBottom = useCallback(() => {

    requestAnimationFrame(() => {

      if (listRef.current) {

        listRef.current.scrollTop = listRef.current.scrollHeight;

      }

    });

  }, []);

  useEffect(() => {
    // The storage event does not fire in the same tab that changes localStorage.
    // Track the auth values as a fallback, so logout/login is reflected even if
    // the existing logout handler does not dispatch a custom event.
    const getAuthSignature = () => `${localStorage.getItem('capwareToken') || ''}::${localStorage.getItem('capwareUser') || ''}`;
    let lastAuthSignature = getAuthSignature();

    const syncUser = (force = false) => {
      const nextSignature = getAuthSignature();
      if (!force && nextSignature === lastAuthSignature) return;
      lastAuthSignature = nextSignature;

      const nextUser = getCurrentUser();
      // Reset the visible/local conversation when the account changes so that
      // the previous account's messages are not left on screen after logout.
      localStorage.removeItem(CONVERSATION_KEY);
      localStorage.removeItem(OWNER_KEY);
      setConversationId('');
      setCurrentUser(nextUser);
      setMessages([makeWelcomeMessage(nextUser)]);
      setError('');
      setShowLead(false);
    };

    const handleStorage = (event) => {
      if (event && ['capwareUser', 'capwareToken'].includes(event.key)) syncUser();
    };

    window.addEventListener('storage', handleStorage);
    const handleAuthChanged = () => syncUser(true);
    window.addEventListener('capware-auth-changed', handleAuthChanged);

    // Same-tab fallback: detect changes made by logout/login code that only
    // calls localStorage.removeItem/setItem and does not dispatch an event.
    const pollId = window.setInterval(() => syncUser(), 300);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('capware-auth-changed', handleAuthChanged);
      window.clearInterval(pollId);
    };
  }, []);

  const createConversation = useCallback(async () => {

    const response = await axios.post(`${API_URL}/ai-chat/new`, {}, {

      headers: getHeaders(),

    });

    const id = response.data?.conversation?.conversationId;

    if (!id) throw new Error('Could not start a new conversation.');

    if (response.data.ownerKey) {

      localStorage.setItem(OWNER_KEY, response.data.ownerKey);

    } else {

      localStorage.removeItem(OWNER_KEY);

    }

    localStorage.setItem(CONVERSATION_KEY, id);

    setConversationId(id);

    setMessages([makeWelcomeMessage(currentUser)]);

    return id;

  }, [currentUser]);

  const loadConversation = useCallback(async () => {

    const id = localStorage.getItem(CONVERSATION_KEY);

    if (!id) {

      setConversationId('');

      setMessages([makeWelcomeMessage(currentUser)]);

      return;

    }

    setLoadingHistory(true);

    setError('');

    try {

      const response = await axios.get(

        `${API_URL}/ai-chat/conversations/${encodeURIComponent(id)}`,

        { headers: getHeaders() }

      );

      setConversationId(id);

      setMessages(

        response.data?.conversation?.messages?.length

          ? response.data.conversation.messages

          : [makeWelcomeMessage(currentUser)]

      );

    } catch (err) {

      localStorage.removeItem(CONVERSATION_KEY);

      if (err.response?.status === 404) {

        /* Preserve owner key to allow an anonymous chat to be recreated after login changes. */

      }

      setConversationId('');

      setMessages([makeWelcomeMessage(currentUser)]);

      if (err.response?.status !== 404) {

        setError('Could not load previous chat. Start a new conversation.');

      }

    } finally {

      setLoadingHistory(false);

    }

  }, [currentUser]);

  useEffect(() => {

    loadConversation();

  }, [loadConversation]);

  useEffect(() => {

    scrollToBottom();

  }, [messages, open, scrollToBottom]);

  useEffect(() => {

    if (open) inputRef.current?.focus();

  }, [open]);

  async function handleNewChat() {

    if (sending) return;

    setError('');

    try {

      await createConversation();

      inputRef.current?.focus();

    } catch {

      setError('Could not start a new chat. Check your connection.');

    }

  }

  async function sendText(text) {

    const clean = String(text || '').trim();

    if (!clean || sending) return;

    setError('');

    setInput('');

    const userMessage = { role: 'user', content: clean };

    setMessages((prev) => [...prev, userMessage]);

    setSending(true);

    try {

      let id = conversationId;

      if (!id) {

        id = await createConversation();

        setMessages([makeWelcomeMessage(currentUser), userMessage]);

      }

      const response = await axios.post(

        `${API_URL}/ai-chat/message`,

        { conversationId: id, message: clean, language },

        { headers: getHeaders() }

      );

      if (!response.data?.reply) throw new Error('Empty AI response.');

      setMessages((prev) => [

        ...prev,

        {

          role: 'assistant',

          content: response.data.reply,

          sources: response.data.sources || [],

        },

      ]);

    } catch (err) {

      setError(

        err.response?.data?.message ||

        'Could not send your message. Please try again.'

      );

      setMessages((prev) => [

        ...prev,

        {

          role: 'assistant',

          content: 'I could not answer that just now. Please try again.',

          local: true,

        },

      ]);

    } finally {

      setSending(false);

      scrollToBottom();

    }

  }

  async function handleSend(e) {

    e?.preventDefault();

    await sendText(input);

  }

  async function handleClearChat() {

    if (sending) return;

    setError('');

    try {

      if (conversationId) {

        await axios.delete(

          `${API_URL}/ai-chat/conversations/${encodeURIComponent(conversationId)}`,

          { headers: getHeaders() }

        );

      }

      localStorage.removeItem(CONVERSATION_KEY);

      localStorage.removeItem(OWNER_KEY);

      setConversationId('');

      setMessages([makeWelcomeMessage(currentUser)]);

    } catch (err) {

      setError(

        err.response?.data?.message || 'Could not clear this conversation.'

      );

    }

  }

  function startVoice() {

    const SpeechRecognition =

      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      setError('Voice input is not supported in this browser. Try Chrome or Edge.');

      return;

    }

    try {

      const recognition = new SpeechRecognition();

      recognition.lang =

        language === 'Hindi'

          ? 'hi-IN'

          : language === 'Marathi'

            ? 'mr-IN'

            : 'en-IN';

      recognition.interimResults = false;

      recognition.maxAlternatives = 1;

      recognition.onresult = (e) =>

        setInput(e.results?.[0]?.[0]?.transcript || '');

      recognition.onerror = () =>

        setError('Voice input could not be captured. Check microphone permission.');

      recognitionRef.current = recognition;

      recognition.start();

    } catch {

      setError('Could not start voice input. Check microphone permission.');

    }

  }

  function speak(text) {

    if (!('speechSynthesis' in window)) {

      setError('Spoken responses are not supported in this browser.');

      return;

    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang =

      language === 'Hindi'

        ? 'hi-IN'

        : language === 'Marathi'

          ? 'mr-IN'

          : 'en-IN';

    window.speechSynthesis.speak(utterance);

  }

  async function submitLead(e) {

    e.preventDefault();

    setLeadSending(true);

    setLeadStatus('');

    try {

      const response = await axios.post(

        `${API_URL}/ai-chat/leads`,

        { ...lead, conversationId },

        { headers: getHeaders() }

      );

      setLeadStatus(response.data.message);

      setLead({

        name: '',

        email: '',

        phone: '',

        interest: 'General enquiry',

        message: '',

        consentToContact: false,

      });

    } catch (err) {

      setLeadStatus(

        err.response?.data?.message ||

        'Could not submit enquiry. Please try again.'

      );

    } finally {

      setLeadSending(false);

    }

  }

  return (

    <div className="cap-ai-root">

      {open && (

        <section

          className="cap-ai-panel"

          role="dialog"

          aria-label="Capware AI chat"

          aria-modal="false"

        >

          <header className="cap-ai-header">

            <div className="cap-ai-brand">

              <div className="cap-ai-logo">

                <i className="bi bi-stars" />

              </div>

              <div>

                <strong>Capware AI</strong>

                <span>

                  <span className="cap-ai-online-dot" /> Website & AI assistant

                </span>

              </div>

            </div>

            <div className="cap-ai-header-actions">

              <button

                type="button"

                title="New chat"

                aria-label="New chat"

                onClick={handleNewChat}

                disabled={sending}

              >

                <i className="bi bi-plus-lg" />

              </button>

              <button

                type="button"

                title="Clear chat"

                aria-label="Clear chat"

                onClick={handleClearChat}

                disabled={sending}

              >

                <i className="bi bi-trash3" />

              </button>

              <button

                type="button"

                title="Minimize chat"

                aria-label="Minimize chat"

                onClick={() => setOpen(false)}

              >

                <i className="bi bi-dash-lg" />

              </button>

            </div>

          </header>

          <div className="cap-ai-toolbar">

            <label htmlFor="cap-ai-language">Reply language</label>

            <select

              id="cap-ai-language"

              value={language}

              onChange={(e) => setLanguage(e.target.value)}

            >

              <option>English</option>

              <option>Hindi</option>

              <option>Marathi</option>

            </select>

            <button type="button" onClick={() => setShowLead((v) => !v)}>

              <i className="bi bi-person-lines-fill" /> Contact team

            </button>

          </div>

          {showLead && (

            <form className="cap-ai-lead-form" onSubmit={submitLead}>

              <strong>Request a callback</strong>

              <div className="cap-ai-lead-grid">

                <input

                  required

                  minLength={2}

                  maxLength={100}

                  placeholder="Your name"

                  value={lead.name}

                  onChange={(e) => setLead({ ...lead, name: e.target.value })}

                />

                <input

                  type="email"

                  maxLength={180}

                  placeholder="Email address"

                  value={lead.email}

                  onChange={(e) => setLead({ ...lead, email: e.target.value })}

                />

                <input

                  maxLength={30}

                  placeholder="Phone number"

                  value={lead.phone}

                  onChange={(e) => setLead({ ...lead, phone: e.target.value })}

                />

                <select

                  value={lead.interest}

                  onChange={(e) => setLead({ ...lead, interest: e.target.value })}

                >

                  <option>General enquiry</option>

                  <option>Website development</option>

                  <option>Mobile app development</option>

                  <option>Desktop / billing software</option>

                  <option>Internship</option>

                  <option>Workshop / online class</option>

                  <option>Final-year project</option>

                  <option>Student support</option>

                </select>

              </div>

              <textarea

                rows="2"

                maxLength={3000}

                placeholder="What do you need help with?"

                value={lead.message}

                onChange={(e) => setLead({ ...lead, message: e.target.value })}

              />

              <label className="cap-ai-consent">

                <input

                  type="checkbox"

                  checked={lead.consentToContact}

                  onChange={(e) =>

                    setLead({ ...lead, consentToContact: e.target.checked })

                  }

                />{' '}

                I agree that Capware may contact me about this enquiry.

              </label>

              <button className="cap-ai-lead-submit" disabled={leadSending}>

                {leadSending ? 'Submitting…' : 'Submit enquiry'}

              </button>

              {leadStatus && (

                <p className="cap-ai-lead-status" role="status">

                  {leadStatus}

                </p>

              )}

            </form>

          )}

          <div className="cap-ai-subheader">

            <i className="bi bi-shield-check" /> Don't share passwords, OTPs or

            payment-card details.

          </div>

          <div className="cap-ai-messages" ref={listRef} aria-live="polite">

            {loadingHistory && (

              <div className="cap-ai-loading-history">

                Loading conversation…

              </div>

            )}

            {messages.map((message, index) => (

              <div

                key={`${index}-${message.role}`}

                className={`cap-ai-message ${message.role === 'user' ? 'is-user' : 'is-assistant'

                  }`}

              >

                {message.role === 'assistant' && (

                  <span className="cap-ai-message-avatar">

                    <i className="bi bi-stars" />

                  </span>

                )}

                <div className="cap-ai-message-stack">

                  <div className="message-content">

                    {message.role === 'assistant' ? (

                      <ReactMarkdown remarkPlugins={[remarkGfm]}>

                        {message.content}

                      </ReactMarkdown>

                    ) : (

                      message.content

                    )}

                  </div>

                  {message.role === 'assistant' && !message.local && (

                    <div className="cap-ai-message-tools">

                      <button

                        type="button"

                        onClick={() => speak(message.content)}

                        title="Read aloud"

                      >

                        <i className="bi bi-volume-up" /> Listen

                      </button>

                      <button

                        type="button"

                        onClick={() => {

                          navigator.clipboard

                            ?.writeText(message.content)

                            .catch(() => { });

                        }}

                        title="Copy response"

                      >

                        <i className="bi bi-copy" /> Copy

                      </button>

                    </div>

                  )}

                  {message.sources?.length > 0 && (

                    <div className="cap-ai-sources">

                      <small>

                        Knowledge sources:{' '}

                        {message.sources.map((s) => s.title).join(' · ')}

                      </small>

                    </div>

                  )}

                </div>

              </div>

            ))}

            {messages.length === 1 && (

              <div className="cap-ai-quick-prompts">

                {prompts.map((p) => (

                  <button

                    type="button"

                    key={p}

                    onClick={() => sendText(p)}

                    disabled={sending}

                  >

                    {p}

                  </button>

                ))}

              </div>

            )}

            {sending && (

              <div className="cap-ai-message is-assistant">

                <span className="cap-ai-message-avatar">

                  <i className="bi bi-stars" />

                </span>

                <div className="cap-ai-bubble cap-ai-typing">

                  <span />

                  <span />

                  <span />

                </div>

              </div>

            )}

          </div>

          {error && (

            <div className="cap-ai-error" role="alert">

              <i className="bi bi-exclamation-circle" /> {error}

            </div>

          )}

          <form className="cap-ai-composer" onSubmit={handleSend}>

            <textarea

              ref={inputRef}

              rows="1"

              maxLength={4000}

              value={input}

              onChange={(e) => setInput(e.target.value)}

              onKeyDown={(e) => {

                if (e.key === 'Enter' && !e.shiftKey) {

                  e.preventDefault();

                  handleSend(e);

                }

              }}

              placeholder="Ask Capware AI anything…"

              aria-label="Message Capware AI"

              disabled={sending}

            />

            <button

              type="button"

              aria-label="Use voice input"

              title="Voice input"

              onClick={startVoice}

              disabled={sending}

            >

              <i className="bi bi-mic-fill" />

            </button>

            <button

              type="submit"

              aria-label="Send message"

              disabled={!input.trim() || sending}

            >

              <i className="bi bi-arrow-up" />

            </button>

          </form>

          <footer className="cap-ai-footer">

            AI can make mistakes. Verify important information.{' '}

            <a href="mailto:capwaresystems@gmail.com">Contact support</a>

          </footer>

        </section>

      )}

      <button

        type="button"

        className={`cap-ai-launcher ${open ? 'is-open' : ''}`}

        onClick={() => setOpen((v) => !v)}

        aria-label={open ? 'Close Capware AI' : 'Open Capware AI'}

        aria-expanded={open}

      >

        <i className={`bi ${open ? 'bi-x-lg' : 'bi-chat-dots-fill'}`} />

        {!open && <span>Ask AI</span>}

      </button>

    </div>

  );

}