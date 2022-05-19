export const signup = (email, password, firstName, lastName) => {
    return fetch('/api/accounts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName })
    }).then(res => res.json());
};

export const login = (email, password) => {
    return fetch('/api/accounts/security/token', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: email, password: password })
    }).then(res => res.json());
};
  
export const getMovies = (pageNo) => {
    return fetch(
        `/api/movies?page=${pageNo}`,{headers: {
                  }
                 }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

  export const getUpcomingMovies = (pageNo) => {
    return fetch(
        `/api/movies/upcoming?page=${pageNo}`,{headers: {
        'Authorization': window.localStorage.getItem('token')
        }
       }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }; 

  export const getMovie = (args) => {
    console.log(args)
   const [, idPart] = args.queryKey;
   const { id } = idPart;
   return fetch(
    `/api/movies/${id}`,{headers: {
        'Authorization': window.localStorage.getItem('token')
    }}
   ).then((response) => {
     if (!response.ok) {
       throw new Error(response.json().message);
     }
     return response.json();
   })
   .catch((error) => {
     throw error
  });
 };