import React from 'react'

const Pictures = ({data}) => {
  return (
    <div className='picture'>
        <p>{data.photographer}</p>
        <div className="imageContainer">
            <img src={data.src.large} alt="" />
        </div>

        <p>Dowmnload Image <a target='_blank' href={data.src.large}>Cliick here:</a></p>
    </div>
  )
}

export default Pictures