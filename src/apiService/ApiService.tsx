
const baseUrl = "https://jsonplaceholder.typicode.com";

class ApiService {

    async callApi(url: string, options?: RequestInit) {
        try {
            const response = await fetch(url, options);
            return response.json();
        } catch (error) {
            console.error(error);
        }
    }

    getUserData = async () => {
        return this.callApi(`${baseUrl}/users`);
    }

    addUser = async (title: string, description: string) => {
        return this.callApi(`${baseUrl}/users`, {
            method: 'POST',
            body: JSON.stringify({
                name: title,
                company: {
                    catchPhrase: description,
                },
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    deleteUser = async (userId: number) => {
        return this.callApi(`${baseUrl}/users/${userId}`, {
            method: 'DELETE',
        });
    }

    updateUser = async (userId: number, title: string, description: string) => {
        return this.callApi(`${baseUrl}/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: title,
                id: userId,
                company: {
                    catchPhrase: description,
                },
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }
}
const apiService = new ApiService();
export default apiService;