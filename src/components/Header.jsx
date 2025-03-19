import './Header.css'

const Header = ({ title, isMobile }) => {
  return (
    <div>
      <div className='background-header'></div>
      <header className='header'>
        <div className='name-page'>
          <div className='title-page'>{title}</div>
          <div className='updatedOn'>
            <i>Updated on 23 May 2023</i>
          </div>
        </div>
        <div className='header-user'>
          {!isMobile && ( // Показываем инпут в хедере, только если экран > 768px
            <div className='search-block'>
              <input className='search-input' type='text' placeholder='Search your coins...' />
              <button className='search-button2'>
                <img src='/img/search.svg' className='search-img' alt='' />
              </button>
            </div>
          )}
          <button className='notifications'>
            <img className='notification-img' src='/img/notification-bing.svg' alt='' />
          </button>
          <div className='profile-user'>
            <img src='/img/avatar-user.svg' className='avatar-user' alt='' />
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
