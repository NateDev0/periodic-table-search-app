const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = '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';

async function askChemistryQuestion(question) {
    try {
        const response = await fetch(OPENAI_API_ENDPOINT, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: `You are a chemistry expert. Please answer this question concisely and accurately: ${question}`
                }],
                max_tokens: 150,
                temperature: 0.3
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, I could not process your question.';
    }
} 
