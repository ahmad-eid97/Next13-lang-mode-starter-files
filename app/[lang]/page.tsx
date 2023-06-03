"use client";
// TYPES
// import { Metadata } from 'next';
// I18N STUFF
import { getDictionary } from '../../get-dictionary';
import { Locale } from '../../i18n-config';
// REDUX STUFF
import { test } from 'store/slices/common/commonSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';
// STYLES
import '../../styles/global.scss';
import styles from './home.module.scss';
// COOKIES STUFF
import Cookies from 'universal-cookie';
const cookie = new Cookies();
// META DATA ( IT JUST WORKS FOR SERVER COMPONENTS )
// export const metadata: Metadata = {
//   title: '',
//   description: '',
// }

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dispatch = useAppDispatch();
  const commonData = useAppSelector((state) => state.common);
  const dictionary = await getDictionary(lang);

  const switchLang = () => {
    const newLang = lang === "ar" ? "en" : "ar"
    cookie.set('next13-lang', newLang, { path: '/' });
    location.reload()

    console.log(commonData);
    dispatch(test("ahmad eid"));
  }

  const switchMode = () => {
    const currentMode = cookie.get('next13-mode');
    if (currentMode === 'light') {
      cookie.set('next13-mode', 'dark', { path: '/' });
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      cookie.set('next13-mode', 'light', { path: '/' });
      document.body.classList.add('light')
      document.body.classList.remove('dark')
    }
  }

  return (
    <>
      {/* <head>
        <title>Taskat | Home</title>
        <meta name="description" content="Home Page" />
      </head> */}
      <div className={styles.container}>
        <h1>{dictionary.welcome}</h1>
        <button onClick={switchLang}>Switch Lang</button>
        <button onClick={switchMode}>Switch Mode</button>
      </div>
    </>
  )
}
