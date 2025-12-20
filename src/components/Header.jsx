import chef_logo from '../assets/chef-icon.png'

export default function Header() {
    return (
        <header className='header'>
            <img src={chef_logo} alt="Chef Icon" width={43} height={52} />
            <p className='site-name'>Chef Claude</p>
        </header>
    )
}