import React from 'react'
import styles from '@/app/styles/page.module.css'

export default function User({user}) {
  return (
    <>
     <p>Hello, ${user.username}!</p>
    <img className = {styles.img} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" width = "100" height = "100"></img>
    <p className = {styles.cardText}>username: ${user.username}</p>
    <p className = {styles.cardText}>Email: ${artist.email} </p>    
    </>
  )
}
