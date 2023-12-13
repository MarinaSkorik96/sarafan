 export const Render = () => {
  return (
    <>
      <select className="change_post-authore"
        onChange={(e) => setChangedUser(e.target.value)}
      >
        {allUsers ? allUsers.map((user) => {
          return (
            <option
              key={user.id}
              selected={post.userId === user.id ? user.name : false}
            >{user.name}</option>
          )
        }) : null}
      </select>
      <textarea
        rows='3'
        className="change_post-title"
        onChange={(e) => setTitle(e.target.value)}
      >
        {postToBeDeleted.title}
      </textarea>
      <textarea
        rows='7'
        className="change_post-body"
        onChange={(e) => setText(e.target.value)
        }
      >
        {postToBeDeleted.body}
      </textarea>
    </>

  )
}