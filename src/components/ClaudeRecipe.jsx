import ReactMarkdown from 'react-markdown'
import { useRef, useEffect } from 'react'

// Display generated recipe in markdown
export default function ClaudeRecipe(props) {
    const recipeRef = useRef(null)

    // Scroll to recipe once it becomes available
    useEffect(() => {
        recipeRef.current?.scrollIntoView({
            bahavior: 'smooth',
            block: 'start'
        });
    }, [props.recipe])
    
    return (
        <section className='recipe-container' ref={recipeRef}>
            <h1 className='recipe-header'>Chef Claude Recommends: </h1>
            <ReactMarkdown>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )
}
