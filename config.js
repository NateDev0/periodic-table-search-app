const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;  // Get this from your .env file

async function askChemistryQuestion(question) {
    try {
        const response = await fetch(OPENAI_API_ENDPOINT, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4-turbo-preview",  // Using GPT-4 for better chemistry knowledge
                messages: [{
                    role: "user",
                    content: `You are a chemistry expert. Please answer this question concisely and accurately: ${question}`
                }],
                max_tokens: 150,
                temperature: 0.3  // Lower temperature for more precise answers
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, I could not process your question.';
    }
} 
