import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

const ShareButtons = ({ report }) => {

  const facebookQuote = 
    `Hi Facebook Community, please me find this missing person: ${report.fullName}\n`
    +  `${report.imageURL}\n`
    + `Current Age: ${report.currentAge[0].number ? report.currentAge[0].number + ' ' + report.currentAge[0].type + ' old' : 'Unreported'}\n`
    + `Date Last Seen: ${report.dateLastSeen ? new Date(report.dateLastSeen).toISOString().split("T")[0] : 'Unreported'}\n`
    + `Location Last Seen: ${report.locationLastSeen.city ? report.locationLastSeen.city : 'Unreported'}, ${report.locationLastSeen.state ? report.locationLastSeen.state : ''}`;

  return (
    <div className="flex flex space-x-2 pb-4 pr-2 w-full justify-end">
      <FacebookShareButton
        url={`https://www.hopehelpers.netlify.app/?searchQuery=${report.fullName}`}
        // url={shareUrl}
        quote={`${facebookQuote}`}
        target="_blank"
      >
        <FacebookIcon size={26} round />
      </FacebookShareButton>
      <TwitterShareButton url={`https://www.hopehelpers.netlify.app/?searchQuery=${report.fullName}`} title={`Missing Person: ${report.fullName}`}>
        <TwitterIcon size={26} round />
      </TwitterShareButton>
      {/* <WhatsappShareButton url={shareUrl} title={`Missing Person: ${report.fullName}`}> */}
      <WhatsappShareButton url={`https://www.hopehelpers.netlify.app/?searchQuery=${report.fullName}`} title={`Missing Person: ${report.fullName}`}>
        <WhatsappIcon size={26} round />
      </WhatsappShareButton>
      <EmailShareButton
        // url={shareUrl}
        url={`https://www.hopehelpers.netlify.app/?searchQuery=${report.fullName}`}
        subject={`Missing Person: ${report.fullName}`}
        body={
          `Check out this missing person report: Missing Person: ${report.fullName}\n
          ${report.imageURL}\n
          Current Age: ${report.currentAge[0].number ? report.currentAge[0].number + ' ' + report.currentAge[0].type + ' old' : 'Unreported'}\n
          Date Last Seen: ${report.dateLastSeen ? new Date(report.dateLastSeen).toISOString().split("T")[0] : 'Unreported'}\n
          Location Last Seen: ${report.locationLastSeen.city ? report.locationLastSeen.city : 'Unreported'}, ${report.locationLastSeen.state ? report.locationLastSeen.state : ''};
          `
        }
        >
          <EmailIcon size={26} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;
