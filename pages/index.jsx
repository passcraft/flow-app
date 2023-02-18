import isInitializedScript from 'cadence/scripts/isInitialized';
import { Button } from 'components/';
import ROUTES from 'constants/routes';
import { useWeb3Context } from 'contexts/Web3';
import { ActionPanel, NavPanel, PageContainer, PageContent } from 'layout';
import { Magic } from 'magic-sdk';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from 'styles/HomePage.module.css';

const customNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/"', // Polygon RPC URL
  chainId: 80001, // Polygon chain id
};
const Home = () => {
  const router = useRouter();
  const { connect, user, executeScript } = useWeb3Context();

  const handleLogin = async (e) => {
    const magic = new Magic('pk_live_5C2FC054DE037A4B', {
      network: customNodeOptions,
    });

    e.preventDefault();
    const email = new FormData(e.target).get('email');
    /* One-liner login with email OTP 🤯 */

    await magic.auth
      .loginWithEmailOTP({ email }, customNodeOptions)
      .catch((error) => {
        console.error('hello', error);
        router.push(ROUTES.CREATE);
      });

    const checkIsInitialized = async () => {
      try {
        const isUserInitialized = await executeScript(
          isInitializedScript,
          (arg, t) => [arg(user.addr, t.Address)],
        );

        if (isUserInitialized) {
          router.push(ROUTES.CREATE);
        } else {
          router.push(ROUTES.CREATE);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIsInitialized();
  };
  /* 2. Initialize Magic Instance */

  useEffect(() => {
    if (!user.loggedIn) return;

    const checkIsInitialized = async () => {
      try {
        const isUserInitialized = await executeScript(
          isInitializedScript,
          (arg, t) => [arg(user.addr, t.Address)],
        );

        if (isUserInitialized) {
          router.push(ROUTES.CREATE);
        } else {
          router.push(ROUTES.CREATE);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIsInitialized();
  }, [user, executeScript, router]);

  return (
    <PageContainer withHeader={false}>
      {/* <PageContent>
        <Image
          src="/images/ui/monster_maker_logo.png"
          alt="logo"
          width={2176}
          height={800}
          className={styles.logo}
        />
      </PageContent> */}

      {/* <ActionPanel /> */}
      <div>
        {/* <div>
          <h1>Please sign up or login</h1>
          <form
            onSubmit={(e) => handleLogin(e)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={styles.inp}
            />
            <button type="submit" className={styles.btn}>
              Send
            </button>
          </form>
        </div>
        <NavPanel>
          <button onClick={connect} className={styles.btn}>
            Connect
          </button> */}
        {/* </NavPanel> */}
        <section class="h-screen">
          <div class="px-6 h-full text-gray-800">
            <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  class="w-full"
                  alt="Sample image"
                />
              </div>
              <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <div class="flex flex-row items-center justify-center lg:justify-start">
                  <p class="text-lg mb-0 mr-4">Sign in with</p>
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={connect}
                    class="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                  >
                    Flow
                  </button>
                </div>

                <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p class="text-center font-semibold mx-4 mb-0">Or</p>
                </div>

                <form onSubmit={(e) => handleLogin(e)}>
                  <div class="mb-6">
                    <input
                      type="text"
                      name="email"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      placeholder="Email address"
                    />
                  </div>

                  <div class="text-center lg:text-left">
                    <button
                      type="submit"
                      class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Login with magic
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
};

export default Home;
