import React from 'react'
import Navbar from '../../sections/Navbar'
import Hero from '../../sections/Hero'
import About from '../../sections/About'
import Projects from '../../sections/Projects'
import WorkExperience from '../../sections/Experience'
import Certificates from '../../sections/Certificates'
import Contact from '../../sections/Contact'
import Footer from '../../sections/Footer'


const main = () => {
return (
<div className='flex-col flex justify-center'>
    <Navbar />
    <Hero />
    <About />
    <Projects />
    <Certificates />  
    <WorkExperience />
    <Contact />
    <Footer />
</div>
)
}

export default main
