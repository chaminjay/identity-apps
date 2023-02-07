/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {
    IdentifiableComponentInterface
} from "@wso2is/core/models";
import {
    DocumentationLink,
    GridLayout,
    PageLayout,
    useDocumentation
} from "@wso2is/react-components";
import React, {
    FunctionComponent,
    ReactElement,
    useState
} from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, Grid, Icon, Message } from "semantic-ui-react";
import { AppConstants, history } from "../../core";
import { ServerConfigurationsConstants } from "../../server-configurations";
import { useTokenReuseConfigData } from "../api";

/**
 * Private key JWT client authentication for OIDC configuration page.
 *
 * @param props - Props injected to the component.
 * @returns Private key JWT client authentication for OIDC configuration page component.
 */
export const PrivateKeyJWTConfigEditPage: FunctionComponent<IdentifiableComponentInterface> = (
    props: IdentifiableComponentInterface
): ReactElement => {
    const { [ "data-componentid" ]: componentId } = props;
    const { t } = useTranslation();
    const { getLink } = useDocumentation();
    const [ enableTokenReuse, setEnableTokenReuse ] = useState<boolean>(true);

    const {
        data: tokenReuseData,
        isLoading: isLoading,
        error: tokenReuseDataFetchError,
        mutate: mutateTokenReuseData
    } = useTokenReuseConfigData();

    /**
     * Handles back button click event
     */
    const handleBackButtonClick = () => {
        history.push(
            AppConstants.getPaths()
                .get("GOVERNANCE_CONNECTOR")
                .replace(
                    ":id",
                    ServerConfigurationsConstants.LOGIN_ATTEMPT_SECURITY_CONNECTOR_CATEGORY_ID
                )
        );
    };

    /**
     * Handles token reuse toggle button
     */
    const handleTokenReuseToggle: () => void = () => {
        setEnableTokenReuse(!enableTokenReuse);
    };

    return (!isLoading ? (
        <PageLayout
            pageTitle="Private Key JWT Client Authentication for OIDC"
            title={ (
                <>
                    Private Key JWT Client Authentication for OIDC
                </>
            ) }
            description={ (
                <>
                    Authenticate confidential clients to the authorization server when using the token endpoint.
                    <DocumentationLink
                        link={ getLink("manage.validation.passwordValidation.learnMore") }
                    >
                        { t("common:learnMore") }
                    </DocumentationLink>
                </>
            ) }
            data-componentid={ `${ componentId }-page-layout` }
            backButton={ {
                "data-testid": `${ componentId }-page-back-button`,
                onClick: handleBackButtonClick,
                text: t(
                    "console:manage.features.validation.goBackToValidationConfig"
                )
            } }
            bottomMargin={ false }
            contentTopMargin={ true }
            pageHeaderMaxWidth={ true }
        >
            <>
                <Checkbox
                    label={ tokenReuseData.tokenReuse ? "Token Reuse Enabled" : "Token Reuse Disabled" }
                    toggle
                    onChange={ handleTokenReuseToggle }
                    checked={ tokenReuseData.tokenReuse }
                    readOnly={ false }
                    data-testId={ `${ componentId }-enable-toggle` }
                />
            </>
            <Grid className={ "mt-2" } >
                <Grid.Row columns={ 1 }>
                    <Grid.Column width={ 10 }>
                        <Message
                            info
                            content={ (
                                <>
                                    <Icon name="info circle"/>
                                    If enabled, the JTI in the JWT will be unique per the request if the previously
                                    used JWT is not already expired. JTI (JWT ID) is a claim that provides a unique
                                    identifier for the JWT.
                                </>
                            ) }
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </PageLayout>) : (
        <GridLayout
            isLoading={ isLoading }
            className={ "pt-5" }
        />)
    );
};

/**
 * Default props for the component.
 */
PrivateKeyJWTConfigEditPage.defaultProps = {
    "data-componentid": "private-key-jwt-config-edit-page"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default PrivateKeyJWTConfigEditPage;
