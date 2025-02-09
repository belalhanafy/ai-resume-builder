import React from 'react'
import SectionHeader from '../SectionHeader'

const Summary = ({ resumeInfo }) => {
    return (
        resumeInfo && (
            <div>
                <SectionHeader header={"summary"} resumeInfo={resumeInfo} />
                <h2>{resumeInfo?.summary}</h2>
            </div>
        )
    )
}

export default Summary