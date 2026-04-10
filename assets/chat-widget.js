// Claw Forge Chat Widget - Channele
(function() {
  const ASSISTANT_ID = 'asst_qEYEqNXfMRlzXxyI2AXNtvyW';
  const API_ENDPOINT = '/api/chat';
  const BOT_NAME = 'Channele';
  
  // Create widget HTML
  const widgetHTML = `
    <div id="cf-chat-widget" style="position:fixed;bottom:20px;right:20px;z-index:9999;font-family:Inter,Arial,sans-serif;">
      <!-- Rest State with Greeting - Higher and More Visible -->
      <div id="cf-chat-rest" style="display:flex;flex-direction:column;align-items:flex-end;gap:12px;cursor:pointer;transition:all .3s;">
        <div id="cf-chat-greeting" style="background:linear-gradient(135deg,#f87171,#ef4444);border:none;border-radius:16px;padding:16px 20px;box-shadow:0 8px 32px rgba(248,113,113,.4);opacity:0;transform:translateY(20px) scale(0.95);transition:all .4s cubic-bezier(0.34, 1.56, 0.64, 1);max-width:280px;margin-bottom:8px;">
          <div style="color:white;font-size:15px;font-weight:700;margin-bottom:6px;">👋 Hi! I'm ${BOT_NAME}</div>
          <div style="color:rgba(255,255,255,.9);font-size:13px;line-height:1.5;">Your Political Intelligence Assistant. Ask me about our services, political communication, or propaganda analysis!</div>
          <div style="margin-top:10px;padding:8px 14px;background:rgba(255,255,255,.2);border-radius:8px;color:white;font-size:12px;font-weight:600;text-align:center;">Click to chat →</div>
        </div>
        <div id="cf-chat-button" style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#f87171,#ef4444);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(248,113,113,.4);transition:all .3s;flex-shrink:0;border:3px solid rgba(255,255,255,.1);">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
      </div>
      
      <!-- Chat Window -->
      <div id="cf-chat-window" style="display:none;position:absolute;bottom:85px;right:0;width:380px;height:520px;background:#111827;border:1px solid rgba(255,255,255,.1);border-radius:20px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.5);">
        <div style="background:linear-gradient(135deg,#f87171,#ef4444);padding:18px 22px;display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:40px;height:40px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center;font-weight:800;color:#ef4444;font-size:18px;box-shadow:0 2px 8px rgba(0,0,0,.2);">C</div>
            <div>
              <div style="font-weight:800;color:white;font-size:16px;">${BOT_NAME}</div>
              <div style="font-size:12px;color:rgba(255,255,255,.85);">Political Intelligence Assistant</div>
            </div>
          </div>
          <button id="cf-chat-close" style="background:rgba(255,255,255,.2);border:none;border-radius:50%;width:36px;height:36px;color:white;cursor:pointer;font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center;transition:all .2s;">×</button>
        </div>
        <div id="cf-chat-messages" style="height:380px;overflow-y:auto;padding:20px;background:#0a0f18;"></div>
        <div style="padding:16px 20px;background:#111827;border-top:1px solid rgba(255,255,255,.1);display:flex;gap:10px;">
          <input id="cf-chat-input" type="text" placeholder="Ask ${BOT_NAME} anything..." style="flex:1;padding:14px 18px;background:#1f2937;border:1px solid rgba(255,255,255,.1);border-radius:12px;color:#f0f4f8;font-size:14px;outline:none;transition:all .2s;">
          <button id="cf-chat-send" style="padding:14px 24px;background:linear-gradient(135deg,#f87171,#ef4444);border:none;border-radius:12px;color:white;font-weight:700;cursor:pointer;transition:all .2s;box-shadow:0 4px 12px rgba(248,113,113,.3);">Send</button>
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
      greeting.style.transform = 'translateY(0) scale(1)';
      
      // Show for 6 seconds then minimize
      setTimeout(() => {
        greeting.style.opacity = '0.85';
        greeting.style.transform = 'translateY(5px) scale(0.98)';
      }, 6000);
    }, 1500); // Wait 1.5 seconds after page load
  } else {
    // Show minimized greeting for returning users
    greeting.style.opacity = '0.85';
    greeting.style.transform = 'translateY(0) scale(1)';
  }
  
  // Open chat
  function openChat() {
    window_.style.display = 'block';
    restState.style.display = 'none';
    sessionStorage.setItem('channele-interacted', 'true');
    
    if (messages.children.length === 0) {
      addMessage('assistant', `Hi! I'm ${BOT_NAME}, your Political Intelligence Assistant. 🎯\n\nI can help you with:\n• Our services (Rapid Response Desk, packages, pricing)\n• Political communication strategy\n• Propaganda analysis and counter-messaging\n• Campaign messaging and positioning\n\nWhat would you like to explore?`);
    }
  }
  
  // Close chat
  function closeChat() {
    window_.style.display = 'none';
    restState.style.display = 'flex';
    greeting.style.opacity = '0.85';
    greeting.style.transform = 'translateY(0) scale(1)';
  }
  
  // Event listeners
  button.addEventListener('click', openChat);
  restState.addEventListener('click', openChat);
  close.addEventListener('click', closeChat);
  
  // Add message to chat
  function addMessage(role, text) {
    const div = document.createElement('div');
    div.style.cssText = `margin-bottom:16px;display:flex;${role === 'user' ? 'justify-content:flex-end' : ''}`;
    
    // Convert newlines to breaks
    const formattedText = text.replace(/\n/g, '<br>');
    
    div.innerHTML = `
      <div style="max-width:85%;padding:14px 18px;border-radius:16px;font-size:14px;line-height:1.6;${
        role === 'user' 
          ? 'background:linear-gradient(135deg,#f87171,#ef4444);color:white;border-bottom-right-radius:6px;box-shadow:0 4px 12px rgba(248,113,113,.25);' 
          : 'background:#1f2937;color:#f0f4f8;border-bottom-left-radius:6px;border:1px solid rgba(255,255,255,.05);'
      }">
        ${formattedText}
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
    typing.innerHTML = `
      <div style="padding:14px 18px;background:#1f2937;color:#94a3b8;border-radius:16px;font-size:14px;display:flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.05);">
        <span style="display:inline-flex;gap:4px;">
          <span style="width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:cf-bounce 1.4s infinite;"></span>
          <span style="width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:cf-bounce 1.4s infinite 0.2s;"></span>
          <span style="width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:cf-bounce 1.4s infinite 0.4s;"></span>
        </span>
        ${BOT_NAME} is typing...
      </div>
      <style>@keyframes cf-bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}</style>
    `;
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
  
  // Button hover effects
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1)';
    button.style.boxShadow = '0 8px 28px rgba(248,113,113,.5)';
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
    button.style.boxShadow = '0 6px 20px rgba(248,113,113,.4)';
  });
})();
