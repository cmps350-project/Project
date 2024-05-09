'use client'
import React from 'react'
import styles from '@/app/styles/page.module.css'
import { useRouter } from 'next/navigation'

export default async function page({ params }) {


  const router = useRouter()

  async function handleSubmit(e) {
      e.preventDefault()
      const formData = new FormData(e.target)
      const newArtwork = Object.fromEntries(formData)

        const response = await fetch('/api/artworks',
              {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(newArtwork)
              }
          )
          alert(JSON.stringify(response))
      }
    


  return (
    <>
           <main className = {styles.sellPageBody}>

            
            <section id="sellart" className = {styles.sellArtSection}>
            <h2 className={styles.title}>Sell Your Art</h2>

              <form className = {styles.sellFormContainer} id = "art-form" onSubmit={handleSubmit}>

                    <label for="title" >Title:</label>
                    <textarea id="title" name="title" className = {styles.formInput}  placeholder="Enter your art piece title" required></textarea>

                    <label>Category:</label>
                    <select name="category" id="category" className = {styles.formInput}>
                        <option value="" disabled selected>Choose a category </option>
                        <option value="Abstract">Abstract</option>
                        <option value="Expressionism">Expressionism</option>
                        <option value="Impressionism">Impressionism</option>
                        <option value="Minimalism">Minimalism</option>
                        <option value="Realism">Realism</option>
                        <option value="Ukiyo-e">Ukiyo-e</option>
                        <option value="Visual">Visual</option>
                    </select>

                    <label for="artpiece-medium">Medium:</label>
                    <input type="text" id="artpiece-medium" name="medium" className = {styles.formInput} placeholder="Enter The medium used for the painting" required></input>
                    

                    <label for="artpiece-year">Year:</label>
                    <input type ="number" id="artpiece-year" name="year"  className = {styles.formInput} placeholder="Enter Published Year" required></input>
                    
                    <label for="artpiece-price">Price:</label>
                    <input type ="number" id="artpiece-price" name="price"  className = {styles.formInput}  placeholder="Enter your price" required></input>
                    
                    <label for="artpiece-image">Image:</label>
                    <input type="url" id="artpiece-image" name="image"className = {styles.formInput} placeholder="Enter Image URL" required></input>

                    <label for="alternative-image">Alternative Image:</label>
                    <input type="url" id="alternative-image" name="alternative" className = {styles.formInput} placeholder="Enter Image URL"  required></input>

                    <label for="description">Description:</label>
                    <textarea id="description" name="description" className = {styles.formInput}  placeholder="Enter your art piece description" required></textarea>

                    <button type="submit" className = {styles.confirmProductBTN} >Sell Product</button>
              </form>
            </section>
        </main>

    </>
  )
}
