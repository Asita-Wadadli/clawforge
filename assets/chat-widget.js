// Claw Forge Chat Widget - Channele
(function() {
  const ASSISTANT_ID = 'asst_qEYEqNXfMRlzXxyI2AXNtvyW';
  const API_ENDPOINT = '/api/chat';
  const BOT_NAME = 'Channele';
  
  // Create widget HTML
  const widgetHTML = `
    <div id="cf-chat-widget" style="position:fixed;bottom:20px;right:20px;z-index:9999;font-family:Inter,Arial,sans-serif;">
      <!-- Rest State with Greeting -->
      <div id="cf-chat-rest" style="display:flex;align-items:center;gap:12px;cursor:pointer;transition:all .3s;">
        <div id="cf-chat-greeting" style="background:#111827;border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:12px 16px;box-shadow:0 4px 20px rgba(0,0,0,.4);opacity:0;transform:translateY(10px);transition:all .3s;">
          <div style="color:#f0f4f8;font-size:14px;font-weight:600;">Hi. I'm ${BOT_NAME}</div>
          <div style="color:#94a3b8;font-size:12px;margin-top:4px;">I'll be your assistant. Click here →</div>
        </div>
        <div id="cf-chat-button" style="width:56px;height:56px;border-radius:50%;background:#f87171;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.3);transition:transform .2s;flex-shrink:0;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
      </div>
      
      <!-- Chat Window -->
      <div id="cf-chat-window" style="display:none;position:absolute;bottom:70px;right:0;width:360px;height:500px;background:#111827;border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.4);">
        <div style="background:#0a0f18;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:32px;height:32px;border-radius:50%;background:#f87171;display:flex;align-items:center;justify-content:center;font-weight:700;color:white;font-size:14px;">C</div>
            <div>
              <div style="font-weight:700;color:#f0f4f8;">${BOT_NAME}</div>
              <div style="font-size:11px;color:#94a3b8;">Political Intelligence Assistant</div>
            </div>
          </div>
          <button id="cf-chat-close" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:20px;line-height:1;">×</button>
        </div>
        <div id="cf-chat-messages" style="height:380px;overflow-y:auto;padding:20px;background:#0a0f18;"></div>
        <div style="padding:16px 20px;background:#111827;border-top:1px solid rgba(255,255,255,.1);display:flex;gap:8px;">
          <input id="cf-chat-input" type="text" placeholder="Ask ${BOT_NAME}..." style="flex:1;padding:12px 16px;background:#1f2937;border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#f0f4f8;font-size:14px;outline:none;">
          <button id="cf-chat-send" style="padding:12px 20px;background:#f87171;border:none;border-radius:10px;color:white;font-weight:600;cursor:pointer;">Send</button>
        </div>
      </div>
    </div>
  `;
  
  // Inject widget
  document.body.insertAdjacentHTML('beforeend', widgetHTML);
  
  // Elements
  const restState = document.getElementById('cf-chat-rest');
  const greeting = document.getElementById('cf-chat-greeting');
  const button = document.getElementById('cf-chat-button');
  const window_ = document.getElementById('cf-chat-window');
  const close = document.getElementById('cf-chat-close');
  const messages = document.getElementById('cf-chat-messages');
  const input = document.getElementById('cf-chat-input');
  const send = document.getElementById('cf-chat-send');
  
  let threadId = null;
  let hasInteracted = sessionStorage.getItem('channele-interacted');
  
  // Auto-popup on first visit
  if (!hasInteracted) {
    setTimeout(() => {
      greeting.style.opacity = '1';
      greeting.style.transform = 'translateY(0)';
      
      // Show for 6 seconds then minimize
      setTimeout(() => {
        greeting.style.opacity = '0';
        greeting.style.transform = 'translateY(10px)';
      }, 6000);
    }, 2000); // Wait 2 seconds after page load
  } else {
    // Show minimized greeting for returning users
    greeting.style.opacity = '0.7';
    greeting.style.transform = 'translateY(0)';
  }
  
  // Open chat
  function openChat() {
    window_.style.display = 'block';
    restState.style.display = 'none';
    sessionStorage.setItem('channele-interacted', 'true');
    
    if (messages.children.length === 0) {
      addMessage('assistant', `Hi! I'm ${BOT_NAME}. I can help you learn about Claw Forge Political Intelligence, explain political communication concepts, or answer questions about our services. What would you like to know?`);
    }
  }
  
  // Close chat
  function closeChat() {
    window_.style.display = 'none';
    restState.style.display = 'flex';
    greeting.style.opacity = '0.7';
    greeting.style.transform = 'translateY(0)';
  }
  
  // Event listeners
  button.addEventListener('click', openChat);
  restState.addEventListener('click', openChat);
  close.addEventListener('click', closeChat);
  
  // Add message to chat
  function addMessage(role, text) {
    const div = document.createElement('div');
    div.style.cssText = `margin-bottom:16px;display:flex;${role === 'user' ? 'justify-content:flex-end' : ''}`;
    div.innerHTML = `
      <div style="max-width:80%;padding:12px 16px;border-radius:12px;font-size:14px;line-height:1.5;${
        role === 'user' 
          ? 'background:#f87171;color:white;border-bottom-right-radius:4px;' 
          : 'background:#1f2937;color:#f0f4f8;border-bottom-left-radius:4px;'
      }">
        ${text}
      </div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
  
  // Send message
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    
    addMessage('user', text);
    input.value = '';
    
    // Show typing indicator
    const typing = document.createElement('div');
    typing.id = 'cf-typing';
    typing.style.cssText = 'margin-bottom:16px;';
    typing.innerHTML = `<div style="padding:12px 16px;background:#1f2937;color:#94a3b8;border-radius:12px;font-size:14px;">${BOT_NAME} is typing...</div>`;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
    
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, threadId })
      });
      
      const data = await response.json();
      
      // Remove typing indicator
      const typingEl = document.getElementById('cf-typing');
      if (typingEl) typingEl.remove();
      
      if (data.threadId) threadId = data.threadId;
      addMessage('assistant', data.response);
    } catch (error) {
      const typingEl = document.getElementById('cf-typing');
      if (typingEl) typingEl.remove();
      addMessage('assistant', `Sorry, I had trouble connecting. Please try again or book a call at https://cal.com/clawforge-qo4djf/clawforge-consultation`);
    }
  }
  
  send.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
})();
