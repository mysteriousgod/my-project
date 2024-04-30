import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
 <h4>Lost your way go back to login page</h4>
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>back to login page</a>

      </p>
    </div>
  )
}

export default BeforeLogin
