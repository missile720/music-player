import './main.css'

function Main() {
    return (
    <div className='container-fluid h-100'>
        <div className='row h-100'>
            {/* left column */}
            <div className='col-6'>
                {/* Nav/search bar */}
                <div className='col-12'>
                    Nav/search bar
                </div>
                <div className='col-12'>
                    <h3>Library</h3>
                </div>
                {/* Library playlist */}
                <div className='col-12'>

                </div>
            </div>

            {/* right column */}
            <div className='col-6'>
                column
            </div>
        </div>
    </div>
    )
}

export default Main