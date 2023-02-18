import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from 'styles/InitializePage.module.css';
import initAccountTxn from '../cadence/transactions/initAccount';
import { Button, NFTView } from '../components';
import {
  NUM_BACKGROUND_IMAGES,
  NUM_HEAD_IMAGES,
  NUM_LEGS_IMAGES,
  NUM_TORSO_IMAGES,
} from '../constants/assets';
import ROUTES from '../constants/routes';
import { useWeb3Context } from '../contexts/Web3';
import { ActionPanel, NavPanel, PageContainer, PageContent } from '../layout';
import getRandomInt from '../utils/getRandomInt';

const Initialize = () => {
  const router = useRouter();
  const { executeTransaction, transaction } = useWeb3Context();

  const handleInit = async () => {
    await executeTransaction(initAccountTxn, () => [], {
      limit: 9999,
    });
  };

  useEffect(() => {
    if (transaction.id !== null) {
      router.push(ROUTES.CREATE);
    }
  }, [router, transaction]);

  return (
    <PageContainer pageTitle="Initialize">
      <PageContent>
        <div className={styles.opacityWrapper}>
          <NFTView
            bgIndex={getRandomInt(NUM_BACKGROUND_IMAGES)}
            headIndex={getRandomInt(NUM_HEAD_IMAGES)}
            legsIndex={getRandomInt(NUM_LEGS_IMAGES)}
            torsoIndex={getRandomInt(NUM_TORSO_IMAGES)}
          />
        </div>
      </PageContent>

      <ActionPanel>
        <img
          style={{ width: 'auto', maxHeight: '100%' }}
          src="/images/ui/initialize_bubble.png"
          alt="Initialize to start minting monsters"
        />
      </ActionPanel>

      <NavPanel>
        <Button
          src="/images/ui/initialize_button.png"
          width={640}
          height={208}
          onClick={handleInit}
          alt="Initialize wallet"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Initialize;
