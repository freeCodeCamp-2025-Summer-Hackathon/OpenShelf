import { Icon } from '@iconify-icon/react'
import { Link } from 'react-router-dom'
import { getItemDetails } from '../api/getItemDetails'
import { getItems } from '../api/getItems'
import FeaturedItems from '../components/FeaturedItems'
import SearchBar from '../../../components/SearchBar'

export async function homePageLoader() {
  try {
    const response = await getItems()
    const items = response.data.results || []

    // If items are available, get details for each item
    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        try {
          const response = await getItemDetails(item.id)
          return response.data
        }
        catch (error) {
          console.warn(`Failed to load details for item ${item.id}:`, error)
          return item // Return original item if details fetch fails
        }
      }),
    )

    return { items: itemsWithDetails }
  }
  catch (error) {
    console.error('Error in homePageLoader:', error)
    return { items: [] } // Return empty array if everything fails
  }
}

export default function HomePage() {
  return (
    <div className="pb-10">
      {/* Hero Section with Enhanced Animation */}
      <div className="bg-[#D3D3F1] min-h-[550px] md:min-h-[600px] bg-[url(/home-hero-brush.svg)] bg-no-repeat bg-size-[auto_500px] bg-center relative flex flex-col md:flex-row justify-center items-center px-4 pt-2 pb-16 md:pt-0 md:pb-20 mt-[-10px]">
        {/* Animated floating elements for visual interest */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-float-slow absolute top-20 left-[10%] w-24 h-24 bg-lavender-300 rounded-full opacity-20"></div>
          <div className="animate-float-medium absolute bottom-20 right-[15%] w-16 h-16 bg-lavender-400 rounded-full opacity-20"></div>
          <div className="animate-float-fast absolute top-[40%] right-[25%] w-12 h-12 bg-lavender-500 rounded-full opacity-10"></div>
        </div>
        
        <div className="max-w-lg text-center md:text-left z-10 animate-fadeIn">
          <h1 className="font-display-7xl text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            What's on
            {' '}
            <br className="hidden md:block" />
            your
            {' '}
            <i className="text-lavender-600 font-serif">Shelf</i>
            {' '}
            today?
          </h1>
          <p className="mt-6 mb-8 text-lg text-gray-700 max-w-md">
            Share and borrow books, tools, and games with your local community. Connect, share resources, and build relationships.
          </p>
          <div className="flex flex-col gap-4 w-full">
            <SearchBar size="large" />
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link to="/listings">
                <button
                  type="button"
                  className="rounded-lg bg-[#5e60ce] hover:bg-[#4e50be] transition-all duration-300 px-8 py-3.5 text-white flex flex-row items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:translate-y-[-2px] text-lg font-medium"
                >
                  <span>View listings</span>
                  <Icon icon="heroicons:arrow-right" className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
              <Link to="/add-item">
                <button
                  type="button"
                  className="rounded-lg border-2 border-[#5e60ce] bg-white hover:bg-lavender-50 transition-all duration-300 px-8 py-3.5 text-[#5e60ce] flex flex-row items-center justify-center gap-2 shadow-md hover:shadow-lg text-lg font-medium"
                >
                  <span>Add Item</span>
                  <Icon icon="heroicons:plus" className="text-xl" />
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block relative animate-slideInRight">
          <img
            src="/home-hero-illustration.svg"
            alt="OpenShelf illustration"
            className="ml-0 lg:ml-[-40px] h-[300px] md:h-[400px] mt-6 md:mt-0 transform transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute top-[-10%] right-[-10%] w-24 h-24 bg-lavender-300 rounded-full blur-xl opacity-30"></div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How OpenShelf Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join our community of borrowers and lenders to share resources and connect with neighbors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-lavender-50 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
              <div className="bg-lavender-100 p-4 rounded-full mb-4">
                <Icon icon="heroicons:user-plus" className="text-4xl text-lavender-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up and join the OpenShelf community to start sharing items.</p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-lavender-50 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
              <div className="bg-lavender-100 p-4 rounded-full mb-4">
                <Icon icon="heroicons:plus-circle" className="text-4xl text-lavender-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Add Your Items</h3>
              <p className="text-gray-600">List books, tools, games and other items you're willing to share.</p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-lavender-50 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
              <div className="bg-lavender-100 p-4 rounded-full mb-4">
                <Icon icon="heroicons:arrow-path" className="text-4xl text-lavender-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Borrow & Share</h3>
              <p className="text-gray-600">Request items from others and approve requests for your own items.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Items Section */}
      <div className="flex flex-row justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Discover Available Items</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore what your community is currently sharing</p>
          </div>
          
          <FeaturedItems />
          
          <div className="mt-16 text-center animate-fadeInUp" style={{ animationDelay: "200ms" }}>
            <Link to="/listings">
              <button
                type="button"
                className="rounded-lg bg-[#5e60ce] hover:bg-[#4e50be] transition-all duration-300 px-8 py-3.5 text-white flex flex-row items-center justify-center gap-2 shadow-md hover:shadow-lg mx-auto transform hover:translate-y-[-2px]"
              >
                <span className="text-lg font-medium">View all listings</span>
                <Icon icon="heroicons:arrow-right" className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Hear from members of our community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:translate-y-[-2px] animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center mb-4">
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
              </div>
              <p className="text-gray-700 mb-4">"OpenShelf has transformed how I think about ownership. Why buy something I'll use only once when I can borrow it from my neighbor?"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-lavender-50 rounded-full flex items-center justify-center text-[#5e60ce] font-bold mr-3 border-2 border-[#5e60ce]">JS</div>
                <div>
                  <p className="font-medium">Jamie Smith</p>
                  <p className="text-sm text-gray-500">Community Member</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:translate-y-[-2px] animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center mb-4">
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
              </div>
              <p className="text-gray-700 mb-4">"I've met so many wonderful people in my neighborhood through sharing books. It's created a real sense of community connection."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-lavender-50 rounded-full flex items-center justify-center text-[#5e60ce] font-bold mr-3 border-2 border-[#5e60ce]">AT</div>
                <div>
                  <p className="font-medium">Alex Thompson</p>
                  <p className="text-sm text-gray-500">Book Enthusiast</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:translate-y-[-2px] animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center mb-4">
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
                <Icon icon="heroicons:star" className="text-yellow-500" />
              </div>
              <p className="text-gray-700 mb-4">"As a DIY enthusiast, OpenShelf has saved me hundreds of dollars on tools I would have only used once. Brilliant concept!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-lavender-50 rounded-full flex items-center justify-center text-[#5e60ce] font-bold mr-3 border-2 border-[#5e60ce]">MP</div>
                <div>
                  <p className="font-medium">Morgan Parker</p>
                  <p className="text-sm text-gray-500">DIY Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-lavender-700 to-lavender-600 text-white py-20 px-4 sm:px-6 lg:px-8 mt-4">
        <div className="max-w-5xl mx-auto text-center animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 md:mb-6">Ready to share with your community?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of neighbors who are already sharing resources, saving money,
            and building stronger communities through OpenShelf.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <button
                type="button"
                className="bg-white text-[#5e60ce] px-8 py-3.5 rounded-lg hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300 font-medium text-lg transform hover:translate-y-[-2px]"
              >
                Join OpenShelf Today
              </button>
            </Link>
            <Link to="/listings">
              <button
                type="button"
                className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-lg transform hover:translate-y-[-2px]"
              >
                Browse Listings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
