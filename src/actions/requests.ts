
const baseUrl = 'https://dev.codeleap.co.uk/careers/';

const api = {
    getPosts: async (offset: number) => {
        try {
            const res = await fetch(`${baseUrl}?limit=10&offset=${offset}`);
            
            if(res.ok) {
                const json = res.json();
                return json;
            }
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    },
    
    createPost: async (userName: string, title: string, content: string) => {
        try {
            const res = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        username: userName,
                        title: title,
                        content: content
                    }
                )
            });

            const json = res.json();

            return json;
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    },

    deletePost: async (postId: number) => {
        try {
            const res = await fetch(`${baseUrl}${postId}/`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    },

    editPost: async (postId: number, title: string, content: string) => {
        try { 
            const res = await fetch(`${baseUrl}${postId}/`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        title: title,
                        content: content
                    }
                )
            })
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    }
}

export default () => api;