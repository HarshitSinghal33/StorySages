import React from 'react'
import { Header } from '../Components/Common/Header'

export function AboutPolicy() {
  return (
    <>
      <Header back={true} />
      <div className='*:m-3 my-6'>
        <h1>Introducing StorySages: Your Gateway to Shared Wisdom</h1>
        <p>StorySages is a platform where wisdom-seekers, or sages, share life's lessons through stories. Just like a sage imparts wisdom, StorySages aims to inspire and enrich lives through narratives. I built it to create a space for sharing my lifelong learnings and to encourage others to do the same.</p>
        <p>Key Features:</p>
        <ul className='[&>*]:m-6 list-disc'>
          <li>LikeStory: Engage with stories by liking them, showing appreciation for the wisdom shared.</li>
          <li>Save Story: Bookmark meaningful tales for later reflection, ensuring you never lose track of valuable insights.</li>
          <li>Visibility: Share your stories with the world or choose more private settings. Public stories are accessible to all, unlisted ones are for those with the link, while private stories are exclusive to you. Drafts allow you to save unfinished stories for personal reflection.</li>
          <li>Follow Authors: Connect with fellow sages by following their profiles, exploring their stories, and sharing in their wisdom.</li>
          <li>Share Profile and Stories: Spread inspiration by sharing your profile and stories with others, inviting them to join the journey of collective learning.</li>
          <li>Your Profile: Your sanctuary for personal expression. Customize your profile with your name, bio, and a snapshot of your journey.</li>
        </ul>

        <h2>Stay Connected:</h2>
        <p>I occasionally share updates and insights on social media platforms. Feel free to connect with me on Twitter: <a className='text-sky-600' href='https://twitter.com/the_frontendev'>@the_frontendev</a>
        </p>
        <p>For any inquiries or feedback, you can reach me via email at  <a className='text-sky-600' href='mailto:ChatanSharma000@gmail.com'>ChatanSharma000@gmail.com</a></p>
        <h3>Disclaimer:</h3>
        <ul className='[&>*]:mx-6 [&>*]:my-3 list-disc'>
          <li>Respect Ownership: Ensure you only share content you own or have permission to use.</li>
          <li>Educational Use: StorySages is for educational and personal enjoyment purposes.</li>
          <li>Your Data, Your Responsibility: You're responsible for the content you upload.</li>
          <li>Contact: In case of any concerns regarding copyright or the content within the app, please contact us at Email.</li><li>Explore additional details for developers in the README on <a className='text-sky-600' href='https://github.com/HarshitSinghal33/siksharthi'>GitHub Repository</a>.</li>
        </ul>
      </div>
    </>
  )
}
