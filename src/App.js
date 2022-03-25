import { useState } from "react";

export default function App() {
  const [widgetState, setWidget] = useState(false);
  return (
    <div className="app m-8">
      <h4 className="text-sm uppercase font-semibold text-indigo-600">Github API</h4>
      <h1 className="text-3xl font-bold text-slate-700">GitHub Profile Widget</h1>
      
      <div className="github-user-account-details-input-section-wrapper mt-6
        flex items-center gap-3
      ">
        <input type="text" placeholder="GitHub Username" 
          className="px-4 py-1 border border-slate-200 rounded-md w-56 focus:outline-indigo-500"
          id="github-username-input"
        />
        <button className="px-4 py-1 bg-indigo-600 text-white border border-indigo-600 rounded-md hover:bg-indigo-700"
          onClick={() => {
            if (document.getElementById('github-username-input').value !== "" &&
              document.getElementById('github-username-input').value !== null &&
              document.getElementById('github-username-input').value !== " "
            ) {
              const githubUserData = fetchUser(document.getElementById('github-username-input').value);
              
              if (githubUserData) {
                setWidget(true);
              } else {
                setWidget(false);
              }
            }
          }}
        >
          Create Widget
        </button>
      </div>
    </div>
  )
}

function fetchUser(username) {
  if (!username) return;
  const githubAPI = "https://api.github.com/";
  fetch(githubAPI + 'users/' + username)
    .then((githubResponse) => githubResponse.json())
    .then((githubResponse) => {
      console.log(githubResponse);
      const githubUsername = githubResponse.login;
      const githubProfileImage = githubResponse.avatar_url;
      const githubProfileURL = githubResponse.url;
      const githubFollowersCount = githubResponse.followers;
      const githubFollowingCount = githubResponse.following;
      const githubNumberOfRepositories = githubResponse.public_repos;
      const githubNumberOfGists = githubResponse.public_gists;
      const githubBio = githubResponse.bio;

      const githubWidgetData = {
        'username': githubUsername,
        'profileImage': githubProfileImage,
        'profileURL': githubProfileURL,
        'followers': githubFollowersCount,
        'following': githubFollowingCount,
        'repos': githubNumberOfRepositories,
        'gists': githubNumberOfGists,
        'bio': githubBio
      }
      return githubWidgetData;
    })
    .catch((err) => {
      console.log('error: ', err);
      return null;
    })
}

function GitHubWidget(widgetData, cardState) {
  if (cardState) {

  } else {
    
  }
}