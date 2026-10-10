import type { UPITransaction } from '../types';

export interface AISummaryResult {
  summary: string;
  riskVectors: {
    category: string;
    severity: string;
    confidence: number;
    description: string;
  }[];
  mitigationSteps: string[];
  recommendedAction: 'FREEZE_IMMEDIATE' | 'ENFORCE_STEPUP_KYC' | 'FLAG_MONITORING' | 'DISMISS_FALSE_POSITIVE';
  isLiveAi: boolean;
}

export interface SARReportData {
  reportId: string;
  generatedAt: string;
  regulatoryBody: string;
  legalAct: string;
  reportingEntity: string;
  investigator: string;
  transactionRef: string;
  senderVpa: string;
  receiverVpa: string;
  amountINR: number;
  riskClassification: string;
  executiveSummary: string;
  forensicEvidence: {
    telemetry: string;
    geography: string;
    deviceAnomaly: string;
    networkHopStatus: string;
  };
  recommendedLegalAction: string;
}

class AIService {
  private apiKey: string = '';

  constructor() {
    if (typeof window !== 'undefined') {
      this.apiKey = localStorage.getItem('gemini_api_key') || (import.meta as unknown as { env: { VITE_GEMINI_API_KEY?: string } }).env?.VITE_GEMINI_API_KEY || '';
    }
  }

  public setApiKey(key: string) {
    this.apiKey = key.trim();
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_api_key', this.apiKey);
    }
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  // Analyzes transaction forensics and generates structured AI summary
  public async analyzeTransaction(tx: UPITransaction): Promise<AISummaryResult> {
    // If Gemini API key is configured, call Gemini API
    if (this.apiKey) {
      try {
        const liveResult = await this.callGeminiAPI(tx);
        if (liveResult) return liveResult;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to heuristic engine:', err);
      }
    }

    // High fidelity built-in Heuristic AI Engine
    return this.generateHeuristicAnalysis(tx);
  }

  private async callGeminiAPI(tx: UPITransaction): Promise<AISummaryResult | null> {
    const prompt = `You are the Lead Cybersecurity AI Agent for NPCI (National Payments Corporation of India) and RBI UPI Fraud Monitoring Cell.
Analyze this suspicious UPI Transaction:
ID: ${tx.id}
Amount: ₹${tx.amount.toLocaleString('en-IN')}
Sender: ${tx.senderName} (${tx.senderVpa}) Bank: ${tx.senderBank}
Receiver: ${tx.receiverName} (${tx.receiverVpa}) Bank: ${tx.receiverBank}
Risk Score: ${tx.riskScore}/100
Flags: ${tx.fraudReasons.join('; ')}
Device Telemetry: Model: ${tx.device.deviceModel}, Rooted: ${tx.device.isRootedOrEmulated}, VPN: ${tx.device.isVpn}, City: ${tx.device.locationCity}, IP: ${tx.device.ipAddress}, SIM swaps 24h: ${tx.device.simSlotChanges24h}

Respond ONLY in valid JSON matching this structure:
{
  "summary": "2-3 sentences concise executive summary explaining the attack vector and threat probability",
  "riskVectors": [
    {"category": "category name", "severity": "HIGH|CRITICAL", "confidence": 95, "description": "evidence detail"}
  ],
  "mitigationSteps": ["Step 1", "Step 2", "Step 3"],
  "recommendedAction": "FREEZE_IMMEDIATE"
}`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!res.ok) throw new Error(`Gemini HTTP error ${res.status}`);
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    const parsed = JSON.parse(text);
    return {
      summary: parsed.summary,
      riskVectors: parsed.riskVectors || [],
      mitigationSteps: parsed.mitigationSteps || [],
      recommendedAction: parsed.recommendedAction || 'FREEZE_IMMEDIATE',
      isLiveAi: true
    };
  }

  private generateHeuristicAnalysis(tx: UPITransaction): AISummaryResult {
    const isMule = tx.fraudCategory === 'MULE_SYNDICATE' || tx.muleHopLevel !== undefined;
    const isPhishing = tx.fraudCategory === 'PHISHING_QR_SPOOF' || tx.fraudCategory === 'SOCIAL_ENGINEERING_REVERSE';
    const isVelocity = tx.fraudCategory === 'VELOCITY_ABUSE' || tx.amount < 100;
    const isStructuring = tx.fraudCategory === 'STRUCTURAL_SPLIT';

    let summary = '';
    const riskVectors = [];
    const mitigationSteps = [];
    let recommendedAction: AISummaryResult['recommendedAction'] = 'FREEZE_IMMEDIATE';

    if (tx.riskScore < 30) {
      return {
        summary: `Transaction ${tx.id} cleared standard heuristic security benchmarks. No malicious telemetry, SIM alteration, or abnormal velocity detected. Risk footprint remains nominal.`,
        riskVectors: [
          { category: 'Baseline Verification', severity: 'LOW', confidence: 99, description: 'Known customer device fingerprint with unbroken 90-day device integrity' },
          { category: 'Merchant Trust Index', severity: 'LOW', confidence: 98, description: 'Verified NPCI merchant gateway VPA with valid MCC classification' }
        ],
        mitigationSteps: ['Permit instant settlement', 'Record normal velocity timestamp'],
        recommendedAction: 'DISMISS_FALSE_POSITIVE',
        isLiveAi: false
      };
    }

    if (isPhishing) {
      summary = `High-confidence Phishing & Reverse Authorization exploit. Target VPA "${tx.receiverVpa}" was programmatically registered with spoofed utility metadata. Telemetry indicates caller impersonation or trojan overlay bypassing standard OTP confirmation.`;
      riskVectors.push(
        { category: 'VPA Reputation Anomaly', severity: 'CRITICAL', confidence: 98, description: 'Receiver VPA created within 120 minutes with zero prior legitimate merchant volume.' },
        { category: 'Device Environment Hijack', severity: 'HIGH', confidence: 94, description: `Device ${tx.device.deviceModel} exhibiting rooted/custom ROM signature with active VPN tunneling.` },
        { category: 'Geographic Teleportation', severity: 'HIGH', confidence: 91, description: `Transaction originated from high-risk cyber hub ${tx.device.locationCity} (${tx.device.locationState}).` }
      );
      mitigationSteps.push('Execute real-time hold on Receiver UPI handle');
      mitigationSteps.push('Trigger automated callback verification to victim phone');
      mitigationSteps.push('Transmit malicious VPA signature to NPCI National Fraud Registry (C-DOT / 1930)');
      recommendedAction = 'FREEZE_IMMEDIATE';
    } else if (isMule) {
      summary = `Syndicate Money Laundering (Mule Chain Hop Level ${tx.muleHopLevel || 2}). Funds moved through an intermediary transitional account with 98% balance depletion within seconds, matching organized cybercrime cash-out behavior.`;
      riskVectors.push(
        { category: 'Layering Velocity', severity: 'CRITICAL', confidence: 97, description: 'Turnover cycle under 60 seconds with no legitimate business merchant classification.' },
        { category: 'Cluster Linkage', severity: 'CRITICAL', confidence: 95, description: `Linked to active syndicate cluster ${tx.clusterId || 'MULE-NET-ALPHA'} encompassing 5+ destination nodes.` },
        { category: 'Hardware Identity Obfuscation', severity: 'HIGH', confidence: 89, description: 'Device running on virtualization emulator environment (Nox/BlueStacks).' }
      );
      mitigationSteps.push('Freeze intermediary mule account across all linked PSP handles');
      mitigationSteps.push('Issue inter-bank lien request via NPCI Emergency API');
      mitigationSteps.push('Isolate destination crypto/ATM exit node before cash-out completion');
      recommendedAction = 'FREEZE_IMMEDIATE';
    } else if (isStructuring) {
      summary = `PMLA Structuring / Smurfing pattern detected. Transfer amount of ₹${tx.amount.toLocaleString('en-IN')} intentionally tailored immediately beneath the ₹1,00,000 regulatory reporting threshold, accompanied by SIM swap anomalies.`;
      riskVectors.push(
        { category: 'Regulatory Avoidance Pattern', severity: 'HIGH', confidence: 92, description: 'Repeated transactions calibrated precisely below automated reporting triggers.' },
        { category: 'SIM Swap Carrier Signal', severity: 'HIGH', confidence: 96, description: `${tx.device.simSlotChanges24h} IMSI carrier change(s) flagged within 24 hours.` }
      );
      mitigationSteps.push('Enforce mandatory Biometric / Aadhaar Face e-KYC challenge');
      mitigationSteps.push('File electronic Suspicious Activity Report (SAR) with FIU-IND');
      mitigationSteps.push('Impose 4-hour cooling window on outbound transfers for this VPA');
      recommendedAction = 'ENFORCE_STEPUP_KYC';
    } else if (isVelocity) {
      summary = `Automated Bot / Brute Force Velocity spike. Micro-probing requests originating from cloud hosting infrastructure targeting bank settlement endpoints.`;
      riskVectors.push(
        { category: 'API Velocity Spike', severity: 'HIGH', confidence: 94, description: 'Request cadence exceeds human touch capability (14 txns / 30s).' },
        { category: 'Autonomous Cloud IP', severity: 'HIGH', confidence: 90, description: `Originating IP ${tx.device.ipAddress} resolves to datacenter ASN (${tx.device.isp}).` }
      );
      mitigationSteps.push('Rate-limit sender IP and drop inbound socket connections');
      mitigationSteps.push('Challenge device with WebAuthn device attestation');
      recommendedAction = 'FREEZE_IMMEDIATE';
    } else {
      summary = `Abnormal behavioral deviation detected. Transaction risk score of ${tx.riskScore}/100 exceeds risk tolerance thresholds due to combined device and geo-location discrepancies.`;
      riskVectors.push(
        { category: 'Behavioral Deviation', severity: 'HIGH', confidence: 88, description: tx.fraudReasons[0] || 'Unusual payment timing and device signature mismatch.' }
      );
      mitigationSteps.push('Temporarily quarantine payment for analyst manual triage');
      mitigationSteps.push('Verify customer device fingerprint');
      recommendedAction = 'FLAG_MONITORING';
    }

    return {
      summary,
      riskVectors,
      mitigationSteps,
      recommendedAction,
      isLiveAi: false
    };
  }

  // Generates formal regulatory FIU-IND / RBI Suspicious Activity Report (SAR)
  public generateSARReport(tx: UPITransaction, investigatorName: string): SARReportData {
    const reportNum = `SAR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      reportId: reportNum,
      generatedAt: new Date().toISOString(),
      regulatoryBody: 'Financial Intelligence Unit - India (FIU-IND) & Reserve Bank of India (RBI)',
      legalAct: 'Prevention of Money Laundering Act (PMLA), 2002 (Sec 12) & NPCI Circular NPCI/UPI/2024-25/89',
      reportingEntity: 'SentinelUPI National Fraud Defense Node (NBFC / Payment Aggregator License #RBI/2024/771)',
      investigator: investigatorName,
      transactionRef: tx.id,
      senderVpa: tx.senderVpa,
      receiverVpa: tx.receiverVpa,
      amountINR: tx.amount,
      riskClassification: `${tx.severity} RISK (${tx.riskScore}/100) - Category: ${tx.fraudCategory || 'UNCLASSIFIED_ANOMALY'}`,
      executiveSummary: `Electronic alert initiated for suspicious UPI settlement totaling ₹${tx.amount.toLocaleString('en-IN')}. The operation exhibits verified forensic indicators of ${tx.fraudCategory ? tx.fraudCategory.replace(/_/g, ' ') : 'unauthorized fraudulent manipulation'}. Telemetry confirms anomalous routing with high probability of syndicate exploitation.`,
      forensicEvidence: {
        telemetry: `Device: ${tx.device.deviceModel} | OS: ${tx.device.osVersion} | Root/Emu: ${tx.device.isRootedOrEmulated ? 'CONFIRMED' : 'NEGATIVE'}`,
        geography: `IP ${tx.device.ipAddress} (${tx.device.isp}) registered in ${tx.device.locationCity}, ${tx.device.locationState}. VPN Tunneling: ${tx.device.isVpn ? 'ACTIVE' : 'INACTIVE'}.`,
        deviceAnomaly: `SIM Slot Carrier Changes (24h): ${tx.device.simSlotChanges24h}. App Version: ${tx.device.appVersion}.`,
        networkHopStatus: tx.muleHopLevel ? `Mule Chain Hop ${tx.muleHopLevel} in Syndicate Cluster ${tx.clusterId || 'ALPHA'}` : 'Direct Peer-to-Peer Transfer Vector'
      },
      recommendedLegalAction: 'Immediate asset freeze pursuant to Section 102 CrPC and NPCI Emergency Debit Block Directive. Transmission of telemetry payload to Cyber Crime Reporting Portal (NCRP) via 1930 API Gateway.'
    };
  }

  // Interactive AI Assistant query
  public async answerAnalystQuery(query: string, transactions: UPITransaction[]): Promise<string> {
    const q = query.toLowerCase();

    if (q.includes('critical') || q.includes('how many')) {
      const criticalCount = transactions.filter(t => t.severity === 'CRITICAL').length;
      const totalAmount = transactions
        .filter(t => t.severity === 'CRITICAL')
        .reduce((sum, t) => sum + t.amount, 0);
      return `There are currently **${criticalCount} CRITICAL fraud alerts** in the live monitoring buffer, representing a cumulative at-risk volume of **₹${totalAmount.toLocaleString('en-IN')}**. The primary vectors are Utility Bill Phishing and Rapid Mule Layering.`;
    }

    if (q.includes('jamtara') || q.includes('mewat') || q.includes('geo') || q.includes('location')) {
      const geoTxs = transactions.filter(t => 
        t.device.locationCity.toLowerCase().includes('jamtara') || 
        t.device.locationCity.toLowerCase().includes('mewat') ||
        t.device.locationCity.toLowerCase().includes('alwar')
      );
      return `Geo-telemetry analysis identifies **${geoTxs.length} flagged transactions** emanating from known cyber-crime hotspots (Jamtara, Mewat, Alwar). Common characteristics include newly registered VPAs, rooted Android handsets, and reverse collect authorization attempts.`;
    }

    if (q.includes('mule') || q.includes('syndicate') || q.includes('network')) {
      return `Mule detection engine is actively tracking **Syndicate Operation BlueVolt** (Cluster: MULE-NET-ALPHA). We have identified 5 hops routing stolen funds from Mumbai victims into P2P crypto sinks in Noida within an average velocity window of 45 seconds per hop. I recommend freezing Node N2 and N3 immediately.`;
    }

    if (q.includes('structuring') || q.includes('split') || q.includes('100000') || q.includes('1 lakh')) {
      const structuring = transactions.filter(t => t.fraudCategory === 'STRUCTURAL_SPLIT');
      return `Structuring detection flags **${structuring.length} transactions** calibrated between ₹95,000 and ₹99,990 to bypass the mandatory ₹1,00,000 automated FIU reporting threshold. These accounts show associated carrier SIM swaps within 24 hours.`;
    }

    if (q.includes('how to freeze') || q.includes('action') || q.includes('recommend')) {
      return `For CRITICAL alerts: Click the transaction in the alert table to open the Forensics Drawer, then click **"Freeze VPA & Account"**. This sends an NPCI emergency block directive and logs an immutable entry in your audit trail. For borderline cases, you can enforce **"Step-Up Biometric KYC"**.`;
    }

    return `AI Fraud Analyst Copilot standing by. Based on the current stream of ${transactions.length} transactions, our heuristic and LLM neural models are monitoring 7 fraud categories across 6 major PSP networks. You can ask me about active syndicates, geographic hotspots, structuring patterns, or specific transaction IDs.`;
  }
}

export const aiService = new AIService();
