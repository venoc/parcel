# GLOBAL BLOCKCHAIN PARCEL STANDARD (GBPS) 
We are proud to introduce the *Global Blockchain Parcel Standard* as our submission for the Mobi Grand Challenge Phase 2!

## Overview

### Our Hackathon Submission
The logistics of last-mile delivery increasingly poses challenges to its stakeholders. Customers requesting specific delivery times, congested cities and the resulting environmental issues, inefficient routes to remote areas and empty trips are just some of the examples.
An innovative solution to these challenges is to leverage other networks for last-mile transport, such as the mobility sharing economy, food delivery services, or - in the nearer future - autonomous machines.
However, this poses a variety of challenges as well. How do you integrate the individual networks transparently and efficiently? How do you handle permissions and traceability? And how do you establish trust in the first place?

During the hackathon, we built an end-to-end system for the integration of external stakeholders for "hard-to-deliver" (e.g., too far off or too late) parcels on the last-mile. In particular, we enable parcel dispatchers (such as Die Post) to offer their unwanted parcel to other networks. Furthermore, the user of a ridesharing service (representing this other network) can then agree to deliver the parcel for cash. The necessary intermediary steps are implemented on a decentral blockchain layer, which has been created for the parcel logistics industry. This use case illustrates and technically builds on our broader vision (see below) perfectly, which is constituted by our **Global Blockchain Parcel Standard**.

In particular, we built the following components:

+ A web application with a multi-layer user interface for parcel dispatchers.
+ A (mobile) ridesharing web application with live maps, displaying the delivery jobs.
+ Several smart contracts connecting these two applications and providing logic.
+ A decentral private Ethereum logistics blockchain network hosting these smart contracts, which ran on an Cluster of AWS EC2 instances. 
+ As well as a functional hardware box with a self-built smart lock to illustrate further services and think the service end-to-end.


### Why Blockchain?
Blockchain, or - more generally - distributed ledger technology is a vital component in our solution for one main reason: In the complex interorganizational processes in last mile parcel logistics, a jointly used platform can leverage an efficient flow of information and processes and drastically lower the number of necessary standards and agreements. Instead of isolated data management and many bilateral contracts, there is one common platform or one agreed-on standard according to which all services are provided. Until shortly, such a platform on which adherence to specific rules hat to be ensured has not been possible without the service of a trusted, central intermediary.

Our blockchain network and the set of generic standard smart contracts deployed on it provide a neutral platform on which the described complex interorganizational processes in parcel logistics can be coordinated without the need for a central intermediary. Instead of the trusted intermediary, the cryptographic methods on which distributed ledger technology bases on and trust in the majority of the participants allow to enjoy all the advantages of a shared platform while avoiding the risk of a potentially monopolistic and costly intermediary. The major players such as big parcel delivery service providers run the platform jointly and at eye level, leveraging trust and transparency.

Finally, a blockchain-based system is also well-suited for the challenges which IT-systems will face in the nearer future, such as integration of economically autonomous machines ("machine economy"). Finally, our Blockchain facilitates carrying out microtransactions directly in the system, with small latencies and without transaction fees.

### Our Vision
In the light of digitization, environmental exigencies as well as new modes of transport and changing customer requirements, the (parcel) logistics sector faces various challenges. While other sectors get disrupted one by one, the parcel logistics sector is still largely based on structures from decades ago. However, the new external demands require a parcel logistics solution fit for the 21st century.

The good news is, a wide variety of solutions for many of the challenges outlined before is already available. Companies such as *slock.it* create smart locks for enabling secure access to physical assets (such as parcels), start-ups like *modum.io* enable trustful tracking of critical transports and initiatives like *TradeLens* improve interorganizational shipping processes. The bad news is that these solutions are often based on isolated data silos, monopolist market structures, opacity, interorganizational process inefficiency and difficulties to enter markets sustainably. What is missing is a common infrastructure to connect all these brilliant individual solutions, enabling collaboration and efficient integration.

Our goal is to build the infrastructure for the GBPS, in which we also run a node in order to provide the best possible service. With our exoertise in the architecture, we can then give smaller businesses access to the ecosystem by providing the relevant interfaces.    

>We envision our **Global Blockchain Parcel Standard** to bridge the individual services and thereby create an innovative ecosystem for innovations in the parcel logistics sector. A first step has already been presented with our smart contract standards, smart lock hardware solution and the creation of our private Quorum logistics blockchain in the Hackathon.

## Set-up Guide
To test our system, you require nothing more than a web browser and some curiosity.

We provide two URLs to our working solution:

On the first webpage, you can see the mobile-oriented application simulating a ridesharing app. Once someone has planned out their journey, they get an offer for transporting a parcel. If you accept to transport it, you will see how your route adapts:

The second link brings you to the parcel dispatcher's user interface. You can see all parcels currently out for adoption in a list. You also see basic information about your blockchain account. You can dispatch new parcels for adoption by other networks in the second category of the menu to the left. These are then sent to the blockchain node. We run the blockchain network on a cluster of AWS EC2 t2.medium instances. But for testing purpose a simple Ganache testnetwork is sufficient.

1. Setup ganache-cli ```npm i ganache-cli -g``` -- Make shure that ganache is using port 8545.
2. Add Metamask to your browser and link it to on of the accounts hosted by ganache.
3. Deploy the smart contract "AllInOne.sol" on the network, which can be done either via truffle or remix.
   1. Replace the address of the smart contract in the files app/index.html and frontend/src/app/@core/data/ethcontract.service.ts
4. Start the backend server by calling the commands ```npm install``` and ```node index.js``` in the folder backend.
5. Start the frontend by 
   1. Changing to the frontend folder
   2. Calling ```npm install```
   3. Calling ```npm rebuild node-sass```
   4. Calling ```ng serve```
   5. The frontend is now available at localhost:4200 
6. Start the app by
   1. Replacing the Google maps api key in the file index.html in the folder app 
   2. And hosting it for the example with ```npm install http-server -g```and ```http-server```
   3. The app is now available at localhost:8080 


The repository should be fairly self-explanatory, but here are some hints nevertheless:
Our web application for parcel dispatchers is built as an Angular project. The "interesting" folder is called 'Backend'. The main scripts are dashboard.component.ts and ethcontract.service.ts.

Our web application simulating a ridesharing app (mobile-optimised) can be found in the folder 'app'. The main script is called index.html.

Our main smart contracts as used in the system can be found in the folder called 'smartContracts'. While the smart contracts ParcelAdministrator.sol, ParcelContract.sol, and ServiceProvider.sol are each instantiations specifically designed for our application. An interesting smart contract is called Interfaces.sol, as it is part of our envisioned GBPS. It generically models a parcel entity and therefore provides a first step towards our broader vision.

## Key Take-Aways
+ During the hackathon, we built a decentral and open end-to-end system for the integration of non-logistics networks into parcel logistics use cases, such as delivering "hard-to-deliver" parcels on the last-mile.
+ Our vision is that our **Global Blockchain Parcel Standard** bridges individual services related (but not limited) to parcel logistics and thereby creates an innovative ecosystem for innovations in this and other sectors.

# Big Thanks to
**Dennis Jelito, Johannes Sedlmeir and Vincent Schlatt who worked with us together all the time on this project and helped to leverage it to what it is today**