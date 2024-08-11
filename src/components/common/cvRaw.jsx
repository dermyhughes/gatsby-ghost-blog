import Helmet from 'react-helmet';
import React from 'react';
import '../../styles/app.scss';

function MetaData() {
  return (
    <Helmet>
      <meta name='robots' content='noindex' />
      <link
        href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Exo:wght@300;400;500;700&display=swap'
        rel='stylesheet'
      />
      <title>Dermot Hughes CV</title>
    </Helmet>
  );
}

function ContactDetail({ icon, text, link }) {
  return (
    <li>
      <img src={icon} alt={`${text} icon`} />
      {link ? (
        <a href={link} rel='noopener noreferrer' target='_blank'>
          {text}
        </a>
      ) : (
        text
      )}
    </li>
  );
}

function ContactDetails() {
  return (
    <div id='contactDetails'>
      <ul>
        <ContactDetail
          icon='/images/icons/email.svg'
          text='contact@dermothughes.com'
          link='mailto:contact@dermothughes.com'
        />
        <ContactDetail
          icon='/images/icons/web.svg'
          text='www.dermothughes.com'
          link='http://www.dermothughes.com'
        />
        <ContactDetail icon='/images/icons/phone.svg' text='(+44) 7818893798' />
      </ul>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <div className='sectionTitle'>
        <h1>{title}</h1>
      </div>
      <div className='sectionContent'>{children}</div>
      <div className='clear' />
    </section>
  );
}

function JobExperience({ title, company, date, description }) {
  return (
    <article>
      <h2>{title}</h2>
      {company && <h3>{company}</h3>}
      <p className='subDetails'>{date}</p>
      {description && <p>{description}</p>}
    </article>
  );
}

function EducationItem({ degree, institution, details }) {
  return (
    <article>
      <h2>{degree}</h2>
      <h3>{institution}</h3>
      <p className='subDetails'>{details}</p>
      <br />
    </article>
  );
}

function CVRaw() {
  return (
    <>
      <MetaData />

      <div id='cv-body'>
        <div id='cv'>
          <div className='mainDetails'>
            <div id='name'>
              <h1>Dermot Hughes</h1>
              <h2>Front End Developer</h2>
            </div>
            <ContactDetails />
            <div className='clear' />
          </div>

          <div id='mainArea'>
            <Section title='Personal Profile'>
              <p>
                UX Engineer based in Belfast, Northern Ireland, specializing in{' '}
                <a
                  href='https://dermothughes.com/is-the-title-front-end-developer-dead/'
                  target='_blank'
                  rel='noreferrer'
                >
                  &quot;Front of the Front End&quot;.
                </a>{' '}
                Passionate about bridging the gap between design and development to create seamless
                user experiences.
              </p>
            </Section>

            <Section title='Work Experience'>
              <JobExperience
                title='Staff Software Engineer'
                date='July 2024 - Present'
                description='Technical Lead Engineer for internal Design System team. React, Node, NPM, Storybook, React Testing Library, Jenkins, Github Actions, and more.'
              />
              <JobExperience
                title='Senior Software Engineer'
                date='April 2022 - June 2024'
                description='Technical Lead Engineer for internal Design System team. React, Node, NPM, Storybook, React Testing Library, Jenkins, Github Actions, and more.'
              />
              <JobExperience
                title='Software Engineer II'
                company='Bazaarvoice'
                date='February 2021 - April 2022'
                description='Front End Developer using React. Focusing on developing and managing an internal design system of reusable React components, Design Tokens, and more.'
              />
              <JobExperience
                title='UX Developer'
                company='Atto Partners'
                date='September 2020 - December 2020'
                description='Front End Development with a focus on UI and UX. Worked on a series of projects with various stacks including Vue and Ruby on Rails.'
              />
              <JobExperience
                title='Front End Engineer'
                company='Micro Focus'
                date='October 2019 - September 2020'
                description='Front End Development using Angular. Developed and maintained a design system and UI Angular component library.'
              />
              <JobExperience
                title='Front End Engineer'
                company='Reward'
                date='April 2018 - October 2019'
                description='Front End Development with HTML5, CSS3, and JavaScript ES6+/TypeScript using Angular. UX and UI Design for Web applications.'
              />
              <JobExperience
                title='Email Development Lead'
                company='Chain Reaction Cycles'
                date='October 2016 - April 2018'
                description='Lead Developer and Line Manager for the Email Marketing team. Responsible for the creation and delivery of responsive mobile-first commercial and CRM emails worldwide.'
              />
              <JobExperience
                title='Technical Support Engineer'
                company='Engage'
                date='April 2016 - October 2016'
              />
              <JobExperience
                title='Desktop Support Engineer'
                company='Egton Health (EMIS)'
                date='June 2014 - March 2016'
              />
            </Section>

            <Section title='Education'>
              <EducationItem
                degree='BSc (Hons) Creative Technologies'
                institution='University of Ulster, Magee'
                details='First Class Honours'
              />
              <EducationItem
                degree='BTEC National Diploma in Multimedia'
                institution='Southern Regional College, Newry'
                details='MMM'
              />
              <EducationItem
                degree='GCSE/A Level'
                institution='Abbey Grammar School, Newry'
                details='A-C including English, Maths, and ICT'
              />
            </Section>

            <Section title='Interests'>
              <p>
                In my free time, I enjoy being creative. I like photography and video production,
                recording music, mountain biking, playing bass guitar, listening to new music,
                watching ice hockey, cooking, and occasionally I’ve taken part as an extra in TV and
                Film productions such as Game of Thrones and The Fall.
              </p>
              <p className='ref'>A list of references is available on request.</p>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVRaw;
