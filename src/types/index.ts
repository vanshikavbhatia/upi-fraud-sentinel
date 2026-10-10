export type RiskSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type AlertStatus = 'OPEN' | 'INVESTIGATING' | 'FROZEN' | 'CLEARED' | 'ESCALATED';

export type FraudCategory =
  | 'MULE_SYNDICATE'
  | 'VELOCITY_ABUSE'
  | 'PHISHING_QR_SPOOF'
  | 'STRUCTURAL_SPLIT'
  | 'SIM_SWAP_DEVICE_ANOMALY'
  | 'GEO_TELEPORTATION'
  | 'SOCIAL_ENGINEERING_REVERSE'
  | 'REPEATED_COLLECT_SPAM';

export type PSPProvider = 'PhonePe' | 'GooglePay' | 'Paytm' | 'CRED' | 'BHIM' | 'AmazonPay';

export type BankName = 'HDFC Bank' | 'State Bank of India' | 'ICICI Bank' | 'Axis Bank' | 'Punjab National Bank' | 'Kotak Mahindra Bank' | 'Paytm' | 'Paytm Payments Bank';

export interface DeviceForensics {
  deviceId: string;
  deviceModel: string;
  osVersion: string;
  appVersion: string;
  ipAddress: string;
  isp: string;
  locationCity: string;
  locationState: string;
  isVpn: boolean;
  isRootedOrEmulated: boolean;
  simSlotChanges24h: number;
}

export interface UPITransaction {
  id: string;
  timestamp: string; // ISO string
  senderVpa: string;
  senderName: string;
  senderBank: BankName;
  senderAccountEnding: string;
  receiverVpa: string;
  receiverName: string;
  receiverBank: BankName;
  receiverAccountEnding: string;
  amount: number;
  psp: PSPProvider;
  riskScore: number; // 0 - 100
  severity: RiskSeverity;
  fraudCategory?: FraudCategory;
  fraudReasons: string[];
  status: AlertStatus;
  device: DeviceForensics;
  muleHopLevel?: number; // 1 to 4 if involved in money mule syndicate
  clusterId?: string; // Group linked syndicate accounts
  analystNotes?: string[];
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'VICTIM' | 'MULE_1' | 'MULE_2' | 'SINK_CRYPTO' | 'SINK_CASH';
  riskScore: number;
  vpa: string;
  amount: number;
  bank: string;
  city: string;
}

export interface NetworkEdge {
  from: string;
  to: string;
  amount: number;
  timestamp: string;
  txId: string;
}

export interface MuleCluster {
  id: string;
  name: string;
  totalVolume: number;
  nodesCount: number;
  status: 'ACTIVE_SYNDICATE' | 'CONTAINED' | 'MONITORING';
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  aiAnalysis: string;
}

export interface UserRole {
  id: string;
  name: string;
  role: 'LEAD_INVESTIGATOR' | 'RISK_ANALYST' | 'COMPLIANCE_OFFICER' | 'AUDITOR';
  badge: string;
  email: string;
}

export interface AuditAction {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: 'FREEZE_VPA' | 'CLEAR_ALERT' | 'ESCALATE_SAR' | 'CHANGE_STATUS' | 'ADD_NOTE' | 'SIMULATE_ATTACK';
  targetTxId: string;
  targetVpa: string;
  details: string;
}

export interface RealtimeMetrics {
  totalProcessedCount: number;
  totalVolumeINR: number;
  fraudAlertCount: number;
  criticalAlertCount: number;
  preventedFraudAmountINR: number;
  fraudRatePercent: number;
  avgDetectionLatencyMs: number;
  activeSyndicatesCount: number;
}
