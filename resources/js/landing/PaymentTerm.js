import React from "react";
import Grid from "@material-ui/core/Grid";

const PaymentTerm=props=>{
    return(
        <div className={'maincontent'}>
            <p className={'title'}>Payment terms</p>
            <Grid container={true}>
                <p>MEMBERSHIP</p>
                <p>
                    Computerzirna offer pay-per-view model to watch course video available on the platform. User are required to register with a valid phone number to become a member, video contents are priced accordingly.
                </p>
                <p>
                    User will be charged a fixed amount to watch content and content once purchased will be available for watch for a fixed period of days.
                    After purchasing the content, user will be able to start watching the content, and as soon as the user start watching the content,
                    the video availability period will start counting.
                     Content will be available for watch for a period of 365 days soon after the user start watching the content.
                </p>
                <p>
                    All contents available in Computerzirna Platform are paid content and available for consumption as a pay-per-view model. Contents are priced by individual Course. User can choose based on their convenience.
                </p>

                <p>
                    PAYMENT OPTIONS
                </p>
                <p>

                </p>
                <p>
                    There are several options to pay for contents in Computerzirna
                </p>
                <p>
                    We accept the locally issued credit, debit and ATM cards from major banks national and international.
                </p>
                <p>
                    NOTE: You may need to enable your card for online transactions
                </p>
                <p>
                    We accept Netbanking from all major banks in India.
                </p>

              <p>
                  We accept UPI payments and wallet - such as GPay, BHIM, Paytm, etc.
              </p>

                <p>
                    REFUND/CANCELLATION AND PAYMENT RELATED ISSUES
                </p>
                <p>
                    User may contact us at thatea2010@gmail.com in case of refund and any other payment issues.
                    In case of refund, payment gateway fees and taxes applicable on the fees may not be refunded once payment has been captured.
                    Once user starts watching the content, cancellation of payment may not be claimed.
                    However, user may request cancellation and refund on non-watched content.
                    Non-watched contents are contents that the user have not started watching,
                    for which the user can claim full refund excluding payment gateway fees
                    and applicable taxes on the gateway fees.
                    For series, user purchased full series, non-watch episodes will be used to calculate the refund amount.
                </p>
                <p>
                    CONTACT SUPPORT
                </p>

                <p>
                    Contact us for any issues relating to payment at 936263680 or using email at thatea2010@gmail.com
                </p>

            </Grid>
        </div>

    )
}
export default PaymentTerm;
