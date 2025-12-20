import ReactMarkdown from 'react-markdown'
import { useRef, useEffect } from 'react'

export default function ClaudeRecipe(props) {
    const recipeRef = useRef(null)

    useEffect(() => {
        recipeRef.current?.scrollIntoView({
            bahavior: 'smooth',
            block: 'start'
        });
    }, [])
    

    return (
        <section className='recipe-container' ref={recipeRef}>
            <h1 className='recipe-header'>Chef Claude Recommends: </h1>
            <ReactMarkdown>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )
}
