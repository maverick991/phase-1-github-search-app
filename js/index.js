// add an event listener to your form that searches a user
//Add an event listener to your form that perfoms the “searchUser” function. 
//The user is the name you type in the submission form. 
//Clear the form after

//Create a “searchUser” function that fetches the GitHub API user list. 
//You will go through each user data and create a card FOR EACH user.
//Create a “renderUser” function that takes in a user and creates a 
//list item with inner html of the user’s name, login, avatar, etc. 
//These keys/values can be found on the Github API 
//Add that list item to the user list

//alt. DOMContent Loaded instead of defer in html


const form = document.getElementById("github-form")
    form.addEventListener("submit", (event) => {
    event.preventDefault(),
    //data we want to pass from the form
    //event.target[0].value
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then(response => response.json())
    .then(response => {
        //login, avatar_url, url
        const userList = document.querySelector("#user-list")
        const reposList = document.getElementById("repos-list")
        reposList.innerHTML = ""
        userList.innerHTML = ""
        response.items.map(item => {
            const li = document.createElement("li")
            const h2 = document.createElement("h2")
            h2.textContent = item.login

            h2.addEventListener("click", event => showUserRepos(item.login, event))
            const img = document.createElement("img") 
            //how will we display elements on page?
            img.src = item.avatar_url

            li.append(h2, img)
            userList.append(li)

            //userList.innerHTML += `<li><h2>${item.login}</h2></li>` <= less pref way.

            //append everything to li first so it is inside the li tag
            //how does it know where to present the li???
        })
        //event.target[0].value = ""
    })

    form.reset()
}) 
            function showUserRepos(username, event){
                const reposList = document.getElementById("repos-list")
                reposList.innerHTML = ""
                event.preventDefault()
                fetch(`https://api.github.com/users/${username}/repos`)
                .then(response => response.json())
                .then(response => response.map(repo => {
                    const li = document.createElement("li")
                    const h1 = document.createElement("h1")
                    h1.textContent = repo.username
                    li.append(h1)
                    reposList.append(li)
                    

                }))
                
                }