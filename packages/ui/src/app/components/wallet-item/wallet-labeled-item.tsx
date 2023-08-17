import { Component } from 'solid-js';
import { Styleable } from 'src/app/models/styleable';
import { PersonalizedWalletInfo } from 'src/app/models/personalized-wallet-info';
import { AT_WALLET_NAME } from 'src/app/env/AT_WALLET_NAME';
import { WalletItem } from 'src/app/components';
import { isWalletInfoCurrentlyInjected } from '@tonconnect/sdk';
import { IMG } from 'src/app/env/IMG';

export interface WalletLabeledItemProps extends Styleable {
    wallet: PersonalizedWalletInfo;
    onClick: () => void;
}

export const WalletLabeledItem: Component<WalletLabeledItemProps> = props => {
    const walletsSecondLine = (): string | undefined => {
        if (props.wallet.name === AT_WALLET_NAME) {
            return undefined;
        }
        if ('isPreferred' in props.wallet && props.wallet.isPreferred) {
            return 'Recent';
        }
        if (isWalletInfoCurrentlyInjected(props.wallet)) {
            return 'Installed';
        }
        if (props.wallet.name === 'Tonkeeper') {
            return 'Popular';
        }
        return undefined;
    };

    return (
        <>
            {props.wallet.name === AT_WALLET_NAME ? (
                <WalletItem
                    icon={props.wallet.imageUrl}
                    name={props.wallet.name + ' on'}
                    secondLine="Telegram"
                    badgeUrl={IMG.TG}
                    onClick={() => {}}
                />
            ) : (
                <WalletItem
                    icon={props.wallet.imageUrl}
                    name={props.wallet.name}
                    secondLine={walletsSecondLine()}
                    secondLineColorPrimary={false}
                    onClick={() => props.onClick()}
                />
            )}
        </>
    );
};