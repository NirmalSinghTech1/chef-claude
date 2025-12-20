import ReactMarkdown from 'react-markdown'

export default function ClaudeRecipe(props) {
    return (
        <ReactMarkdown>
            {console.log(props.recipe)}
            {props.recipe}
        </ReactMarkdown>
    )
}