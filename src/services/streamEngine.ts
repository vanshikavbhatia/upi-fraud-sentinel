import type { UPITransaction, RiskSeverity, FraudCategory, PSPProvider, BankName } from '../types';

const FIRST_NAMES = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Diya', 'Ananya', 'Myra', 'Aadhya', 'Pooja', 'Neha', 'Rohan', 'Sneha', 'Vikram', 'Meera'];
const LAST_NAMES = ['Sharma', 'Verma', 'Patel', 'Reddy', 'Singh', 'Deshmukh', 'Gupta', 'Iyer', 'Nair', 'Chopra', 'Malhotra', 'Joshi', 'Bhatia', 'Menon'];
const PSPS: PSPProvider[] = ['GooglePay', 'PhonePe', 'Paytm', 'CRED', 'BHIM', 'AmazonPay'];
const BANKS: BankName[] = ['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Kotak Mahindra Bank'];
const CITIES = [
  { city: 'Mumbai', state: 'Maharashtra', isRisk: false },
  { city: 'Bengaluru', state: 'Karnataka', isRisk: false },
  { city: 'Delhi', state: 'Delhi', isRisk: false },
  { city: 'Hyderabad', state: 'Telangana', isRisk: false },
  { city: 'Pune', state: 'Maharashtra', isRisk: false },
  { city: 'Chennai', state: 'Tamil Nadu', isRisk: false },
  { city: 'Jamtara', state: 'Jharkhand', isRisk: true },
  { city: 'Mewat', state: 'Haryana', isRisk: true },
  { city: 'Alwar', state: 'Rajasthan', isRisk: true },
];

export class StreamEngine {
  private timer: any = null;
  private isRunning: boolean = true;
  private speedMultiplier: number = 1; // 1x = 3000ms
  private onNewTransactionCallback: ((tx: UPITransaction) => void) | null = null;

  public setCallback(cb: (tx: UPITransaction) => void) {
    this.onNewTransactionCallback = cb;
  }

  public setRunning(running: boolean) {
    this.isRunning = running;
    if (running) {
      this.start();
    } else {
      this.stop();
    }
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  public setSpeed(multiplier: number) {
    this.speedMultiplier = multiplier;
    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }

  public getSpeed(): number {
    return this.speedMultiplier;
  }

  public start() {
    this.stop();
    const intervalMs = Math.max(800, 3000 / this.speedMultiplier);
    this.timer = setInterval(() => {
      if (this.isRunning && this.onNewTransactionCallback) {
        const tx = this.generateRandomTransaction();
        this.onNewTransactionCallback(tx);
      }
    }, intervalMs);
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  // Generates 1 random transaction (80% normal, 20% suspicious)
  public generateRandomTransaction(): UPITransaction {
    const isFraud = Math.random() < 0.22; // 22% chance of suspicious
    const txId = `TXN-${Math.floor(980000 + Math.random() * 19999)}`;
    const psp = PSPS[Math.floor(Math.random() * PSPS.length)];
    const senderBank = BANKS[Math.floor(Math.random() * BANKS.length)];
    const receiverBank = BANKS[Math.floor(Math.random() * BANKS.length)];
    const sName = `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`;
    const sVpa = `${sName.toLowerCase().replace(/\s+/g, '.')}${Math.floor(10 + Math.random() * 89)}@ok${senderBank.split(' ')[0].toLowerCase()}`;

    if (!isFraud) {
      // Legitimate transaction
      const merchants = [
        { name: 'Swiggy Delivery', vpa: 'swiggy.pay@icici', max: 1200 },
        { name: 'Reliance Fresh Store #402', vpa: 'reliance.retail@hdfcbank', max: 4500 },
        { name: 'Uber Rides India', vpa: 'uber.india@axisbank', max: 800 },
        { name: 'Apollo Pharmacy Quick', vpa: 'apollo.health@sbi', max: 2100 },
        { name: 'Sharma Kirana Store', vpa: 'sharma.kirana@paytm', max: 950 },
      ];
      const merchant = merchants[Math.floor(Math.random() * merchants.length)];
      const amount = Math.floor(50 + Math.random() * merchant.max);
      const loc = CITIES.filter(c => !c.isRisk)[Math.floor(Math.random() * 6)];

      return {
        id: txId,
        timestamp: new Date().toISOString(),
        senderVpa: sVpa,
        senderName: sName,
        senderBank,
        senderAccountEnding: `${Math.floor(1000 + Math.random() * 8999)}`,
        receiverVpa: merchant.vpa,
        receiverName: merchant.name,
        receiverBank,
        receiverAccountEnding: `${Math.floor(1000 + Math.random() * 8999)}`,
        amount,
        psp,
        riskScore: Math.floor(2 + Math.random() * 14),
        severity: 'LOW',
        fraudReasons: ['Normal user spending profile', 'Verified merchant entity'],
        status: 'CLEARED',
        device: {
          deviceId: `DEV-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
          deviceModel: 'Samsung Galaxy A54 5G',
          osVersion: 'Android 14',
          appVersion: 'v25.2.0',
          ipAddress: `103.${Math.floor(20 + Math.random() * 80)}.${Math.floor(10 + Math.random() * 200)}.${Math.floor(1 + Math.random() * 250)}`,
          isp: 'Reliance Jio Infocomm',
          locationCity: loc.city,
          locationState: loc.state,
          isVpn: false,
          isRootedOrEmulated: false,
          simSlotChanges24h: 0,
        }
      };
    }

    // Fraudulent transaction with specific signature
    const fraudTypes: { category: FraudCategory; severity: RiskSeverity; minScore: number; maxScore: number; reasons: string[] }[] = [
      {
        category: 'PHISHING_QR_SPOOF',
        severity: 'CRITICAL',
        minScore: 92,
        maxScore: 99,
        reasons: ['Static merchant QR code tampered with dynamic spoofed VPA', 'Recipient account created under 3 hours ago', 'Immediate high-value debit without prior micro-test']
      },
      {
        category: 'MULE_SYNDICATE',
        severity: 'CRITICAL',
        minScore: 90,
        maxScore: 98,
        reasons: ['Automated layering transit: 99% balance exit within 30s', 'Account flagged as intermediate mule in cluster network', 'Emulator virtualization signature detected']
      },
      {
        category: 'STRUCTURAL_SPLIT',
        severity: 'HIGH',
        minScore: 84,
        maxScore: 92,
        reasons: ['Amount tailored below ₹1,00,000 regulatory reporting threshold', 'Multiple identical velocity attempts within 10 minute window']
      },
      {
        category: 'SIM_SWAP_DEVICE_ANOMALY',
        severity: 'HIGH',
        minScore: 85,
        maxScore: 94,
        reasons: ['Carrier IMSI change flagged 42 minutes prior to transaction', 'Unregistered device hardware ID with unverified biometric status']
      },
      {
        category: 'VELOCITY_ABUSE',
        severity: 'HIGH',
        minScore: 78,
        maxScore: 88,
        reasons: ['Abnormal burst velocity: 8 transfers within 20 seconds', 'Automated headless API signature observed in TLS handshake']
      }
    ];

    const chosen = fraudTypes[Math.floor(Math.random() * fraudTypes.length)];
    const riskScore = Math.floor(chosen.minScore + Math.random() * (chosen.maxScore - chosen.minScore));
    const loc = CITIES[Math.floor(Math.random() * CITIES.length)];
    let amount = 0;

    if (chosen.category === 'STRUCTURAL_SPLIT') {
      amount = 99900 - Math.floor(Math.random() * 1500);
    } else if (chosen.category === 'VELOCITY_ABUSE') {
      amount = Math.floor(10 + Math.random() * 50);
    } else {
      amount = Math.floor(35000 + Math.random() * 60000);
    }

    return {
      id: txId,
      timestamp: new Date().toISOString(),
      senderVpa: sVpa,
      senderName: sName,
      senderBank,
      senderAccountEnding: `${Math.floor(1000 + Math.random() * 8999)}`,
      receiverVpa: `suspect.${Math.random().toString(36).substring(2, 6)}@paytm`,
      receiverName: 'Suspicious Payee Node',
      receiverBank,
      receiverAccountEnding: `${Math.floor(1000 + Math.random() * 8999)}`,
      amount,
      psp,
      riskScore,
      severity: chosen.severity,
      fraudCategory: chosen.category,
      fraudReasons: chosen.reasons,
      status: 'OPEN',
      device: {
        deviceId: `DEV-ANOM-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        deviceModel: loc.isRisk ? 'OnePlus (Rooted) / LDPlayer' : 'Realme 11 Pro',
        osVersion: 'Android 13',
        appVersion: 'v23.9.0',
        ipAddress: `117.${Math.floor(100 + Math.random() * 150)}.${Math.floor(10 + Math.random() * 200)}.${Math.floor(1 + Math.random() * 250)}`,
        isp: loc.isRisk ? 'Local High-Speed Wireless' : 'Airtel Broadband',
        locationCity: loc.city,
        locationState: loc.state,
        isVpn: loc.isRisk || Math.random() > 0.5,
        isRootedOrEmulated: loc.isRisk,
        simSlotChanges24h: chosen.category === 'SIM_SWAP_DEVICE_ANOMALY' ? 2 : 0,
      }
    };
  }

  // Preset Attack Injections for instant evaluator demonstrations!
  public injectAttack(scenario: 'MULE_SYNDICATE' | 'PHISHING_STORM' | 'SIM_SWAP_TAKEOVER' | 'BOT_VELOCITY'): UPITransaction[] {
    const now = new Date();
    const created: UPITransaction[] = [];

    if (scenario === 'MULE_SYNDICATE') {
      // Create a rapid 3-node chain
      const rootTx: UPITransaction = {
        id: `TXN-${Math.floor(990000 + Math.random() * 9999)}`,
        timestamp: now.toISOString(),
        senderVpa: 'ramesh.investor@okhdfcbank',
        senderName: 'Ramesh Sundaram (High Net Worth)',
        senderBank: 'HDFC Bank',
        senderAccountEnding: '1092',
        receiverVpa: 'mule.gateway.node1@ybl',
        receiverName: 'Layer 1 Mule - Quick Retail',
        receiverBank: 'ICICI Bank',
        receiverAccountEnding: '9182',
        amount: 245000,
        psp: 'PhonePe',
        riskScore: 99,
        severity: 'CRITICAL',
        fraudCategory: 'MULE_SYNDICATE',
        fraudReasons: [
          'High-value siphon targeting elderly account holder',
          'Layer 1 account opened with forged Aadhaar credentials',
          'Immediate secondary routing scheduled via API token',
          'Syndicate cluster match with "Operation BlueVolt"'
        ],
        status: 'OPEN',
        muleHopLevel: 1,
        clusterId: 'MULE-NET-ALPHA',
        device: {
          deviceId: 'DEV-ROOTED-REDMI-9',
          deviceModel: 'Redmi Note 9 (Rooted Magisk)',
          osVersion: 'Android 11',
          appVersion: 'v23.1.0',
          ipAddress: '182.74.89.21',
          isp: 'Tikona Digital Networks',
          locationCity: 'Jamtara',
          locationState: 'Jharkhand',
          isVpn: true,
          isRootedOrEmulated: true,
          simSlotChanges24h: 3,
        }
      };
      created.push(rootTx);
    } else if (scenario === 'PHISHING_STORM') {
      const spoofTx: UPITransaction = {
        id: `TXN-${Math.floor(990000 + Math.random() * 9999)}`,
        timestamp: now.toISOString(),
        senderVpa: 'anita.nair.pension@oksbi',
        senderName: 'Anita Nair',
        senderBank: 'State Bank of India',
        senderAccountEnding: '6610',
        receiverVpa: 'tatapower.electricity.bill@paytm',
        receiverName: 'Tata Power Electricity Desk (Fake)',
        receiverBank: 'Paytm',
        receiverAccountEnding: '8401',
        amount: 44990,
        psp: 'GooglePay',
        riskScore: 97,
        severity: 'CRITICAL',
        fraudCategory: 'PHISHING_QR_SPOOF',
        fraudReasons: [
          'Mass SMS Phishing Campaign ("Electricity Disconnection Tonight at 9:30 PM")',
          'Malicious reverse UPI collect mandate presented as bill payment',
          'Recipient VPA blacklisted across 3 partner payment gateways',
          'Originating IP trace resolves to Mewat telecom tower cluster'
        ],
        status: 'OPEN',
        device: {
          deviceId: 'DEV-VIRT-BLUESTCKS',
          deviceModel: 'BlueStacks Android 13 Emulator',
          osVersion: 'Android 13',
          appVersion: 'v24.2.1',
          ipAddress: '49.44.110.12',
          isp: 'BSNL Broadband',
          locationCity: 'Mewat',
          locationState: 'Haryana',
          isVpn: true,
          isRootedOrEmulated: true,
          simSlotChanges24h: 0,
        }
      };
      created.push(spoofTx);
    } else if (scenario === 'SIM_SWAP_TAKEOVER') {
      const simTx: UPITransaction = {
        id: `TXN-${Math.floor(990000 + Math.random() * 9999)}`,
        timestamp: now.toISOString(),
        senderVpa: 'sanjay.kapoor.ceo@okhdfcbank',
        senderName: 'Sanjay Kapoor (CEO)',
        senderBank: 'HDFC Bank',
        senderAccountEnding: '3490',
        receiverVpa: 'overseas.transfer.escrow@axisbank',
        receiverName: 'Escrow Vault Global',
        receiverBank: 'Axis Bank',
        receiverAccountEnding: '1109',
        amount: 195000,
        psp: 'CRED',
        riskScore: 96,
        severity: 'CRITICAL',
        fraudCategory: 'SIM_SWAP_DEVICE_ANOMALY',
        fraudReasons: [
          'Critical Telecom Signal: SIM swap executed at carrier store 19 mins prior',
          'New unverified hardware IMEI binding attempted without cooling delay',
          'Sudden transfer of ₹1,95,000 bypassing typical behavioral baseline (₹5,000)',
          'Device GPS teleportation from Mumbai (home base) to Alwar'
        ],
        status: 'OPEN',
        device: {
          deviceId: 'DEV-SIMSWAP-GALAXY',
          deviceModel: 'Samsung Galaxy S22 Ultra',
          osVersion: 'Android 14',
          appVersion: 'v25.0.0',
          ipAddress: '157.34.80.190',
          isp: 'Airtel 5G Plus',
          locationCity: 'Alwar',
          locationState: 'Rajasthan',
          isVpn: false,
          isRootedOrEmulated: false,
          simSlotChanges24h: 1,
        }
      };
      created.push(simTx);
    } else {
      // BOT_VELOCITY
      for (let i = 0; i < 4; i++) {
        const botTx: UPITransaction = {
          id: `TXN-${Math.floor(990000 + Math.random() * 9999)}-${i + 1}`,
          timestamp: new Date(Date.now() - i * 1500).toISOString(),
          senderVpa: `cloud.botnet.worker${i}@pnb`,
          senderName: `Bot Probe Worker ${i + 1}`,
          senderBank: 'Punjab National Bank',
          senderAccountEnding: '9920',
          receiverVpa: `target.merchant.api${i}@okicici`,
          receiverName: 'API Endpoint Node',
          receiverBank: 'ICICI Bank',
          receiverAccountEnding: '5511',
          amount: 5 + i * 2,
          psp: 'BHIM',
          riskScore: 88,
          severity: 'HIGH',
          fraudCategory: 'VELOCITY_ABUSE',
          fraudReasons: [
            'Automated probe cadence: Sub-second micro-transaction burst',
            'Distributed botnet fingerprint attempting dictionary VPA discovery'
          ],
          status: 'OPEN',
          device: {
            deviceId: 'DEV-BOT-SCRAPER',
            deviceModel: 'Automated Headless Runner',
            osVersion: 'Debian 12',
            appVersion: 'API-v1.0',
            ipAddress: `185.220.101.${Math.floor(10 + Math.random() * 80)}`,
            isp: 'Tor Exit / Anonymous VPS',
            locationCity: 'Proxy Node (Delhi Gate)',
            locationState: 'Delhi',
            isVpn: true,
            isRootedOrEmulated: true,
            simSlotChanges24h: 0,
          }
        };
        created.push(botTx);
      }
    }

    return created;
  }
}

export const streamEngine = new StreamEngine();
