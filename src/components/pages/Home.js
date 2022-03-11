
export default function Home() {
    return (
        <div className="Home">
            <h2 className="heading">Enter your GitHub Username</h2>
            <input type="text" placeholder="GitHub Username" />
            <button 
                className="
                    bg-blue-500 
                    text-white 
                    px-4 
                    py-2 
                    rounded-full
                    hover:bg-blue-400
                    text-sm
                ">
                    Generate Dashboard
                </button>
                <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs flex items-center justify-between w-fit hover:bg-blue-500 hover:text-white">
                    Github
                </span>
                
        </div>
    )
}