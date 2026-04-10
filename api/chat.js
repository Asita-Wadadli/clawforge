// Vercel Serverless Function - Chat API Endpoint
// Save as: api/chat.js

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { message, threadId } = req.body;
  const ASSISTANT_ID = 'asst_qEYEqNXfMRlzXxyI2AXNtvyW';
  const API_KEY = process.env.OPENAI_API_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }
  
  try {
    let currentThreadId = threadId;
    
    // Create thread if needed
    if (!currentThreadId) {
      const threadRes = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2'
        }
      });
      const thread = await threadRes.json();
      currentThreadId = thread.id;
    }
    
    // Add message to thread
    await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        role: 'user',
        content: message
      })
    });
    
    // Run assistant
    const runRes = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID
      })
    });
    const run = await runRes.json();
    
    // Poll for completion
    let runStatus = run.status;
    while (runStatus === 'queued' || runStatus === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const statusRes = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/runs/${run.id}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        }
      });
      const status = await statusRes.json();
      runStatus = status.status;
    }
    
    if (runStatus !== 'completed') {
      throw new Error('Run failed: ' + runStatus);
    }
    
    // Get messages
    const messagesRes = await fetch(`https://api.openai.com/v1/threads/${currentThreadId}/messages?limit=1`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
      }
    });
    const messages = await messagesRes.json();
    
    const assistantMessage = messages.data.find(m => m.role === 'assistant');
    const responseText = assistantMessage?.content[0]?.text?.value || 'Sorry, I could not generate a response.';
    
    return res.status(200).json({
      response: responseText,
      threadId: currentThreadId
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: 'Failed to process message',
      response: 'Sorry, I had trouble processing that. Please try again or book a call at https://cal.com/clawforge-qo4djf/clawforge-consultation'
    });
  }
}
