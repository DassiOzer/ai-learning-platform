import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateLesson = async (prompt: string, category: string, subCategory: string) => {
    try {
        const response = await axios.post(OPENAI_API_URL, {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: `Create a lesson about ${prompt} in the category of ${category} and sub-category of ${subCategory}.` }
            ],
            max_tokens: 500,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating lesson:', error);
        throw new Error('Failed to generate lesson');
    }
};