import React, { useState } from "react";

export default function App() {
  const [widgetState, setWidget] = useState(false);
  const [githubUserDataRef, setGithubUserData] = useState([]);
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
                const username = document.getElementById('github-username-input').value;
                (async () => {
                  const res = await fetch(`https://api.github.com/users/${username}`);
                  const githubResponse = await res.json();

                  if (githubResponse !== null) {
                    const githubUsername = githubResponse.login;
                    const githubProfileImage = githubResponse.avatar_url;
                    const githubProfileURL = githubResponse.html_url;
                    const githubFollowersCount = githubResponse.followers;
                    const githubFollowingCount = githubResponse.following;
                    const githubNumberOfRepositories = githubResponse.public_repos;
                    const githubNumberOfGists = githubResponse.public_gists;
                    const githubBio = githubResponse.bio;
                    const githubName = githubResponse.name;

                    setGithubUserData({
                      'username': githubUsername,
                      'profileImage': githubProfileImage,
                      'profileURL': githubProfileURL,
                      'followers': githubFollowersCount,
                      'following': githubFollowingCount,
                      'repos': githubNumberOfRepositories,
                      'gists': githubNumberOfGists,
                      'bio': githubBio,
                      'name': githubName
                    });
                    setWidget(true);
                  } else {
                    setWidget(false);
                  }
                })();
            }
          }}
        >
          Create Widget
        </button>
      </div>
      <div className="github-widget-wrapper mt-8">
        <GitHubWidget cardState={widgetState} widgetData={githubUserDataRef} />
      </div>
    </div>
  )
}

function GitHubWidget({widgetData, cardState}) {
  if (cardState) {
    return (
      <React.Fragment>
        <div className="active-card p-4 border border-slate-200 rounded-md w-fit h-auto">
          <div className="profile-card-widget__header-layer flex flex-row items-center gap-3">
            <img src={widgetData.profileImage} alt={`profile-${widgetData.username}`} 
              className="w-24 h-auto rounded-full"
            />
            <div className="user-profile-account-details">
              <h1 className="font-semibold text-lg text-slate-700">{widgetData.name}</h1>
              <h3 className="github-username text-slate-400">@{widgetData.username}</h3>
              <p className="text-gray-500 text-sm font-semibold w-[42ch]">{widgetData.bio}</p>
            </div>
          </div>
          <div className="profile-card-widget__content-body mt-2 grid grid-cols-3 items-center justify-start gap-2">
            <div className="p-4 h-fit rounded-xl border border-transparent shadow-xl">
              <p className="mt-2 year-tag px-2 py-0.5 rounded-full bg-pink-600 w-fit text-xs font-semibold text-white">
                Followers
              </p>
              <h3 className="leading-snug font-semibold uppercase text-slate-700 pt-2 pr-4">
                {widgetData.followers}
              </h3>
            </div>
            <div className="p-4 h-fit rounded-xl border border-transparent shadow-xl">
              <p className="mt-2 year-tag px-2 py-0.5 rounded-full bg-pink-600 w-fit text-xs font-semibold text-white">
                Following
              </p>
              <h3 className="leading-snug font-semibold uppercase text-slate-700 pt-2 pr-4">
                {widgetData.following}
              </h3>
            </div>
            <div className="p-4 h-fit rounded-xl border border-transparent shadow-xl">
              <p className="mt-2 year-tag px-2 py-0.5 rounded-full bg-pink-600 w-fit text-xs font-semibold text-white">
                Total Public Repositories
              </p>
              <h3 className="leading-snug font-semibold uppercase text-slate-700 pt-2 pr-4">
                {widgetData.repos}
              </h3>
            </div>
            <div className="p-4 h-fit rounded-xl border border-transparent shadow-xl">
              <p className="mt-2 year-tag px-2 py-0.5 rounded-full bg-pink-600 w-fit text-xs font-semibold text-white">
                Public Gists
              </p>
              <h3 className="leading-snug font-semibold uppercase text-slate-700 pt-2 pr-4">
                {widgetData.gists}
              </h3>
            </div>
          </div>
          <a href={widgetData.profileURL ? widgetData.profileURL : 'https://www.github.com'} target="_blank" rel="github-widget-generator"
            className="mt-3 block px-4 py-1 bg-indigo-600 text-white border border-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Visit Profile
          </a>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <div className="disabled-card p-4 border-2 border-dashed text-slate-400 border-slate-300 rounded-md w-52 h-36 flex flex-row items-center justify-center">
          <h3 className="font-semibold text-sm text-center">No Username</h3>
        </div>
      </React.Fragment>
    )
  }
}