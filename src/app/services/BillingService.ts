import fetch from 'node-fetch';

const pathInit = process.env.NEXT_PUBLIC_PATH_PROD;

/**
 * Performs a GET request.
 * @param path - The path to get data from.
 * @param skipToast - Whether to skip showing a toast message (default is true).
 * @returns A Promise that resolves with the response data or rejects with an error message.
 * @throws If an error occurs during the request.
 */


const Get = async (path: string) => {
    
    try {
        const options = {
            method: 'GET',
            headers: {}
        };
        const response = await fetch(pathInit + path , options);
        const responseData = await response.json();
        if (!response.ok) {
            const error = 'Failed to GET';
            throw error;
        }
        return responseData;
    } catch (error) {
        return error;
    }
};


/**
 * Performs a GET request.
 * @param path - The path to get data from.
 * @param skipToast - Whether to skip showing a toast message (default is true).
 * @returns A Promise that resolves with the response data or rejects with an error message.
 * @throws If an error occurs during the request.
 */

const Post = async (path: string, data: any) => {
    console.log('ConfigService ', process.env.NEXT_PUBLIC_PATH_PROD);
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };
        
        const response = await fetch(pathInit + path , options);
        const responseData = await response.json();
        console.log ('Este es el response', response);
        if (!response.ok) {
            if (response.status === 504) throw 'La sincronización se realizará en segundo plano, puedes cerrar esta ventana para continuar';
            if (response.status === 500) throw 'Ha ocurrido un error inesperado, por favor vuelve a intentarlo más tarde';
            if (response.status === 404) throw `Ha ocurrido un error 404 ${response.statusText}`;
            const error = 'Failed to GET';
            throw error;
        }
        return responseData;
    } catch (error) {
        return error;
    }
};

const BillingService = {
    Get,
    Post
};

export default BillingService;