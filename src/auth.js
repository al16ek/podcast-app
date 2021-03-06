export function getAuthForm() {
  return `
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
              <input
                id="email"
                type="email"
                required
              />
              <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
              <input
                id="password"
                type="password"
                required
              />
              <label for="password">Пароль</label>
            </div>
            <button
              type="submit"
              class="mui-btn mui-btn--raised mui-btn mui-btn--primary"
  
            >
              Войти
            </button>
        </form>
        <button
              id="signUpBtn"
              type="submit"
              class="mui-btn mui-btn--raised mui-btn mui-btn--primary"
              
            >
              Зарегистрироваться
            </button>
    `
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = "AIzaSyC7k-5x-uw1Pes4RcEmKKjwx7s1ChyE5bo"
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.idToken)
}
