import React, { useState } from 'react'

const filters = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

export default function ProjectFilter({currentFilter, changeFilter}) {

    const handleClick = (filter) => {
        changeFilter(filter)
    }
  return (
    <div className='project-filter'>
        <nav>
            {filters.map(filter => (
                <button 
                    key={filter}
                    className={filter === currentFilter ? 'active' : ''}
                    onClick={() => handleClick(filter)}
                >
                    {filter}
                </button>
            ))}
        </nav>
    </div>
  )
}
