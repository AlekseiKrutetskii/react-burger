import {apiURL} from "./data";
import {history} from "../services/reducers";

export const checkReponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
    return fetch(apiURL+'auth/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then((res) => checkReponse(res));
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkReponse(res);
    } catch (err) {
        if (err instanceof Error && err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const forgotPassword = async (e, error:boolean, email:string) => {
    e.preventDefault()
    if (!error && email !== '') {
        localStorage.setItem('forgot', 'yes')

        await fetch('https://norma.nomoreparties.space/api/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })
        .then((res) => checkReponse(res))
        .then(data => {
            console.log(data.success?'ok':'error')
            history.push('/reset-password')
        })
        .catch(() => console.log('some error'))
    }
}

export const resetPassword = async (e, password, token) => {
    e.preventDefault()
    await fetch(apiURL+'password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, token})
    })
    .then((res) => checkReponse(res))
    .then(data => {
        console.log(data)
        localStorage.removeItem('forgot')
        history.push('/login')
    })
    .catch(() => console.log('some error'))
}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

export function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}