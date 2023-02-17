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
    const magic = new Magic('pk_live_9386A282035A3B13', {
      network: customNodeOptions,
    });

    e.preventDefault();
    const email = new FormData(e.target).get('email');
    /* One-liner login with email OTP 🤯 */

    await magic.auth.loginWithEmailOTP({ email }, customNodeOptions);

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

      <ActionPanel />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
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
          <Button
            src="/images/ui/connect_button.png"
            width={10}
            height={10}
            onClick={connect}
            alt="Connect wallet"
          />
        </NavPanel>
      </div>
    </PageContainer>
  );
};

export default Home;
