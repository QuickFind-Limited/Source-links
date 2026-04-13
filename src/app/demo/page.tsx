"use client"

import React, { useState, useEffect } from 'react';

const SourceChatDemo = () => {
  const [currentDemo, setCurrentDemo] = useState('onboarding');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [connected, setConnected] = useState(false);
  const [showNDAModal, setShowNDAModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showSOWModal, setShowSOWModal] = useState(false);
  const [showPhaseModal, setShowPhaseModal] = useState<any>(null);
  const [showDeliverableModal, setShowDeliverableModal] = useState<string | null>(null);
  const [ndaSigned, setNdaSigned] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState('readonly');
  const [executionStep, setExecutionStep] = useState(0);
  const [browserStep, setBrowserStep] = useState(0);
  const [activePhases, setActivePhases] = useState<Record<string, boolean>>({});
  const [phaseProgress, setPhaseProgress] = useState<Record<string, number>>({});
  const [sowType, setSowType] = useState('migration');
  const [callReason, setCallReason] = useState('');
  const [expandedSOWSection, setExpandedSOWSection] = useState<string | null>(null);

  const demos = [
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'discovery', label: 'System Scan' },
    { id: 'admin', label: 'Admin Tasks' },
    { id: 'script', label: 'Script Dev' },
    { id: 'browser', label: 'Browser Use' },
    { id: 'integration', label: 'Integration Fix' },
    { id: 'duplicates', label: 'Data Cleanup' },
    { id: 'reports', label: 'Reports' },
    { id: 'workflow', label: 'Workflows' },
    { id: 'rfp', label: 'RFP Generation' },
    { id: 'handoff', label: 'Migration Project' },
  ];

  // Simulate execution progress
  useEffect(() => {
    if (executionStep > 0 && executionStep < 6) {
      const timer = setTimeout(() => setExecutionStep(executionStep + 1), 1500);
      return () => clearTimeout(timer);
    }
    if (browserStep > 0 && browserStep < 6) {
      const timer = setTimeout(() => setBrowserStep(browserStep + 1), 1800);
      return () => clearTimeout(timer);
    }
  }, [executionStep, browserStep]);

  // Simulate phase progress
  useEffect(() => {
    Object.keys(activePhases).forEach(phaseId => {
      if (activePhases[phaseId] && (!phaseProgress[phaseId] || phaseProgress[phaseId] < 100)) {
        const timer = setTimeout(() => {
          setPhaseProgress(prev => ({
            ...prev,
            [phaseId]: Math.min((prev[phaseId] || 0) + 20, 100)
          }));
        }, 1000);
        return () => clearTimeout(timer);
      }
    });
  }, [activePhases, phaseProgress]);

  const MessageBubble = ({ isUser, children }: { isUser: boolean; children: React.ReactNode }) => (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: '16px' }}>
      <div style={{
        maxWidth: '88%',
        padding: '14px 18px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser ? '#f0f0f0' : '#fff',
        border: isUser ? 'none' : '1px solid #e0e0e0',
        fontSize: '14px',
        lineHeight: '1.6',
      }}>
        {children}
      </div>
    </div>
  );

  const SystemCard = ({ title, children, actions, warning, info, success }: {
    title?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    warning?: boolean;
    info?: boolean;
    success?: boolean;
  }) => (
    <div style={{
      border: warning ? '1px solid #f5c242' : info ? '1px solid #64b5f6' : success ? '1px solid #81c784' : '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      marginTop: '12px',
      marginBottom: '12px',
      background: warning ? '#fffef5' : info ? '#f5faff' : success ? '#f1f8f1' : '#fff',
    }}>
      {title && (
        <div style={{
          padding: '10px 14px',
          background: warning ? '#fff9e0' : info ? '#e3f2fd' : success ? '#e8f5e9' : '#f8f8f8',
          borderBottom: warning ? '1px solid #f5c242' : info ? '1px solid #64b5f6' : success ? '1px solid #81c784' : '1px solid #e0e0e0',
          fontSize: '12px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: success ? '#2e7d32' : '#666',
        }}>
          {title}
        </div>
      )}
      <div style={{ padding: '14px' }}>{children}</div>
      {actions && (
        <div style={{ padding: '12px 14px', background: '#fafafa', borderTop: '1px solid #e0e0e0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {actions}
        </div>
      )}
    </div>
  );

  const Button = ({ primary, outline, small, danger, success, children, onClick, disabled }: {
    primary?: boolean;
    outline?: boolean;
    small?: boolean;
    danger?: boolean;
    success?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: small ? '6px 12px' : '10px 18px',
        borderRadius: '6px',
        border: primary || danger || success ? 'none' : '1px solid #ddd',
        background: disabled ? '#ccc' : primary ? '#333' : danger ? '#d32f2f' : success ? '#2e7d32' : outline ? 'transparent' : '#fff',
        color: primary || danger || success ? '#fff' : '#333',
        fontSize: small ? '12px' : '13px',
        fontWeight: '500',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );

  const CheckItem = ({ checked, children, loading }: { checked?: boolean; children: React.ReactNode; loading?: boolean }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
      <span style={{ color: checked ? '#2e7d32' : loading ? '#f5a623' : '#666' }}>
        {loading ? '◐' : checked ? '✓' : '○'}
      </span>
      <span style={{ color: loading ? '#666' : 'inherit' }}>{children}</span>
    </div>
  );

  const ProgressBar = ({ progress, label }: { progress: number; label?: string }) => (
    <div style={{ marginBottom: '8px' }}>
      {label && <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{label}</div>}
      <div style={{ height: '6px', background: '#e0e0e0', borderRadius: '3px' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: progress === 100 ? '#2e7d32' : '#333', borderRadius: '3px', transition: 'width 0.3s' }} />
      </div>
    </div>
  );

  const ExecutionProgress = ({ steps, currentStep }: { steps: { label: string; detail?: string }[]; currentStep: number }) => (
    <div style={{ marginTop: '12px' }}>
      {steps.map((step, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 0',
          borderBottom: i < steps.length - 1 ? '1px solid #f0f0f0' : 'none',
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '600',
            background: i < currentStep ? '#2e7d32' : i === currentStep ? '#f5a623' : '#e0e0e0',
            color: i <= currentStep ? '#fff' : '#666',
          }}>
            {i < currentStep ? '✓' : i + 1}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: i === currentStep ? '600' : '400' }}>{step.label}</div>
            {step.detail && i <= currentStep && (
              <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{step.detail}</div>
            )}
          </div>
          {i === currentStep && <div style={{ fontSize: '11px', color: '#f5a623' }}>In progress...</div>}
        </div>
      ))}
    </div>
  );

  const BrowserPreview = ({ url, content }: { url: string; content: React.ReactNode }) => (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', marginTop: '12px' }}>
      <div style={{ background: '#f5f5f5', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #ddd' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28ca42' }} />
        </div>
        <div style={{ flex: 1, background: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', color: '#666' }}>{url}</div>
      </div>
      <div style={{ padding: '16px', background: '#fafafa', minHeight: '100px', fontSize: '12px' }}>{content}</div>
    </div>
  );

  const CodeBlock = ({ code, language }: { code: string; language: string }) => (
    <div style={{ background: '#1e1e1e', borderRadius: '6px', overflow: 'hidden', marginTop: '12px' }}>
      <div style={{ background: '#333', padding: '6px 12px', fontSize: '11px', color: '#999', display: 'flex', justifyContent: 'space-between' }}>
        <span>{language}</span>
        <span style={{ cursor: 'pointer' }}>Copy</span>
      </div>
      <pre style={{ margin: 0, padding: '12px', fontSize: '11px', color: '#d4d4d4', overflow: 'auto', maxHeight: '180px' }}>{code}</pre>
    </div>
  );

  // Deliverable preview content
  const deliverablePreviews: Record<string, { title: string; type: string; pages: number | string; content: React.ReactNode }> = {
    'data-quality-report': {
      title: 'Data Quality Assessment Report',
      type: 'PDF',
      pages: 12,
      content: (
        <div style={{ fontFamily: 'Georgia, serif' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #333' }}>
            <div style={{ fontSize: '10px', color: '#666', marginBottom: '8px' }}>PREPARED BY SOURCE</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>Data Quality Assessment Report</div>
            <div style={{ fontSize: '12px', color: '#666' }}>QuickBooks → NetSuite Migration</div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '8px' }}>January 27, 2026 | ACME Corporation</div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Executive Summary</div>
            <div style={{ fontSize: '11px', lineHeight: '1.6', color: '#444' }}>
              Analysis of 12,847 customer records, 8,523 inventory items, and 145,234 historical transactions
              from QuickBooks Online. Overall data quality score: <strong>78/100</strong>. Migration readiness:
              <span style={{ color: '#f5a623', fontWeight: 'bold' }}> READY WITH CONDITIONS</span>.
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Data Quality Scores</div>
            <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Category</th>
                  <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Records</th>
                  <th style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Score</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Issues</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Customers</td><td style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #eee' }}>12,847</td><td style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #eee', color: '#f5a623' }}>72</td><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>340 duplicates, 89 missing emails</td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Vendors</td><td style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #eee' }}>2,134</td><td style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #eee', color: '#2e7d32' }}>91</td><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>12 inactive, 3 duplicates</td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Items</td><td style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #eee' }}>8,523</td><td style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #eee', color: '#2e7d32' }}>88</td><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>45 missing costs, 23 orphaned</td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Transactions</td><td style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #eee' }}>145,234</td><td style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #eee', color: '#f5a623' }}>76</td><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>234 unbalanced, 12 orphaned</td></tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Critical Issues Requiring Resolution</div>
            <div style={{ fontSize: '11px', lineHeight: '1.6' }}>
              <div style={{ padding: '8px', background: '#ffebee', borderRadius: '4px', marginBottom: '8px' }}>
                <strong>1. Customer Duplicates (340 records)</strong><br/>
                Multiple records for same customer with different spellings. Recommend merge before migration.
              </div>
              <div style={{ padding: '8px', background: '#fff3e0', borderRadius: '4px', marginBottom: '8px' }}>
                <strong>2. Unbalanced Transactions (234 records)</strong><br/>
                Historical journal entries with rounding differences. Recommend adjustment entries.
              </div>
            </div>
          </div>

          <div style={{ fontSize: '10px', color: '#999', textAlign: 'center', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
            Page 1 of 12 | Generated by Source | Confidential
          </div>
        </div>
      )
    },
    'field-mapping': {
      title: 'Field Mapping Documentation',
      type: 'Excel',
      pages: '4 sheets',
      content: (
        <div>
          <div style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
            {['Customers', 'Items', 'Transactions', 'Custom Fields'].map((tab, i) => (
              <div key={i} style={{ padding: '6px 12px', background: i === 0 ? '#fff' : '#e0e0e0', border: '1px solid #ccc', borderBottom: i === 0 ? '1px solid #fff' : '1px solid #ccc', borderRadius: '4px 4px 0 0', fontSize: '11px', cursor: 'pointer' }}>{tab}</div>
            ))}
          </div>
          <table style={{ width: '100%', fontSize: '10px', borderCollapse: 'collapse', background: '#fff' }}>
            <thead>
              <tr style={{ background: '#1e4d2b', color: '#fff' }}>
                <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ccc' }}>QuickBooks Field</th>
                <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ccc' }}>NetSuite Field</th>
                <th style={{ padding: '6px', textAlign: 'center', border: '1px solid #ccc' }}>Transform</th>
                <th style={{ padding: '6px', textAlign: 'center', border: '1px solid #ccc' }}>Required</th>
                <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ccc' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['DisplayName', 'companyname', 'Direct', 'Yes', ''],
                ['PrimaryEmailAddr', 'email', 'Direct', 'No', 'Validate format'],
                ['BillAddr.Line1', 'billaddr1', 'Direct', 'No', ''],
                ['BillAddr.City', 'billcity', 'Direct', 'No', ''],
                ['BillAddr.CountrySubDivision', 'billstate', 'State Code Lookup', 'No', 'Map full name to code'],
                ['Balance', 'balance', 'Direct', 'No', 'Verify against AR aging'],
                ['CurrencyRef', 'currency', 'Currency Lookup', 'Yes', 'Map to NS currency ID'],
                ['Notes', 'comments', 'Direct', 'No', 'Truncate at 4000 chars'],
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '6px', border: '1px solid #ddd', fontFamily: j < 2 ? 'monospace' : 'inherit' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '8px', fontSize: '10px', color: '#666' }}>
            Showing 8 of 47 customer field mappings
          </div>
        </div>
      )
    },
    'reconciliation-report': {
      title: 'Migration Reconciliation Report',
      type: 'PDF',
      pages: 8,
      content: (
        <div style={{ fontFamily: 'Georgia, serif' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px solid #2e7d32' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2e7d32' }}>✓ MIGRATION RECONCILIATION PASSED</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Test Migration to Sandbox | January 29, 2026</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'Records Migrated', value: '168,738', status: '✓' },
              { label: 'Validation Errors', value: '0', status: '✓' },
              { label: 'Balance Variance', value: '$0.00', status: '✓' },
            ].map((stat, i) => (
              <div key={i} style={{ padding: '12px', background: '#f0f7f0', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2e7d32' }}>{stat.value}</div>
                <div style={{ fontSize: '10px', color: '#666' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>Record Count Reconciliation</div>
            <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Record Type</th>
                  <th style={{ padding: '6px', textAlign: 'right', border: '1px solid #ddd' }}>QuickBooks</th>
                  <th style={{ padding: '6px', textAlign: 'right', border: '1px solid #ddd' }}>NetSuite</th>
                  <th style={{ padding: '6px', textAlign: 'right', border: '1px solid #ddd' }}>Variance</th>
                  <th style={{ padding: '6px', textAlign: 'center', border: '1px solid #ddd' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Customers', '12,847', '12,507', '-340', '✓ Merged'],
                  ['Vendors', '2,134', '2,131', '-3', '✓ Merged'],
                  ['Items', '8,523', '8,500', '-23', '✓ Orphaned removed'],
                  ['Invoices', '45,234', '45,234', '0', '✓'],
                  ['Bills', '23,456', '23,456', '0', '✓'],
                  ['Payments', '76,544', '76,544', '0', '✓'],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '6px', border: '1px solid #eee', textAlign: j === 0 ? 'left' : j === 4 ? 'center' : 'right', color: j === 4 ? '#2e7d32' : 'inherit' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>Financial Reconciliation</div>
            <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #ddd' }}>Account</th>
                  <th style={{ padding: '6px', textAlign: 'right', border: '1px solid #ddd' }}>QuickBooks</th>
                  <th style={{ padding: '6px', textAlign: 'right', border: '1px solid #ddd' }}>NetSuite</th>
                  <th style={{ padding: '6px', textAlign: 'right', border: '1px solid #ddd' }}>Variance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Accounts Receivable', '$234,567.89', '$234,567.89', '$0.00'],
                  ['Accounts Payable', '$67,234.12', '$67,234.12', '$0.00'],
                  ['Inventory Asset', '$456,789.00', '$456,789.00', '$0.00'],
                  ['Revenue (YTD)', '$2,345,678.90', '$2,345,678.90', '$0.00'],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '6px', border: '1px solid #eee', textAlign: j === 0 ? 'left' : 'right', fontWeight: j === 3 ? 'bold' : 'normal', color: j === 3 ? '#2e7d32' : 'inherit' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    'migration-runbook': {
      title: 'Production Migration Runbook',
      type: 'PDF',
      pages: 6,
      content: (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
          <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #333' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Production Migration Runbook</div>
            <div style={{ fontSize: '11px', color: '#666' }}>ACME Corp | QuickBooks → NetSuite | Cutover Date: Feb 10, 2026</div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', background: '#333', color: '#fff', padding: '6px 10px' }}>Pre-Cutover Checklist (Day Before)</div>
            <div style={{ fontSize: '11px', lineHeight: '1.8' }}>
              {[
                'Confirm QuickBooks freeze with accounting team',
                'Verify NetSuite sandbox matches production',
                'Notify all users of system downtime window',
                'Confirm rollback procedures with IT',
                'Test data extraction scripts',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', background: '#333', color: '#fff', padding: '6px 10px' }}>Cutover Day Schedule</div>
            <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['6:00 AM', 'Begin cutover - Lock QuickBooks', 'Source + Client IT'],
                  ['6:15 AM', 'Final data extraction', 'Source (Automated)'],
                  ['7:00 AM', 'Validation of extracted data', 'Source (Automated)'],
                  ['7:30 AM', 'Begin NetSuite import', 'Source (Automated)'],
                  ['10:00 AM', 'Import complete - Begin validation', 'Source + Client'],
                  ['11:00 AM', 'Reconciliation review', 'Client Finance'],
                  ['12:00 PM', 'GO/NO-GO decision', 'Client Management'],
                  ['12:30 PM', 'Enable NetSuite for users', 'Client IT'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold', width: '80px' }}>{row[0]}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row[1]}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', width: '120px', fontSize: '10px', color: '#666' }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: '12px', background: '#ffebee', borderRadius: '6px', fontSize: '11px' }}>
            <strong>Rollback Procedure</strong><br/>
            If critical issues found before 12:00 PM GO/NO-GO: Restore NetSuite from backup, unlock QuickBooks,
            reschedule cutover. Estimated rollback time: 45 minutes.
          </div>
        </div>
      )
    },
    'validation-checklist': {
      title: 'Post-Migration Validation Checklist',
      type: 'Interactive',
      pages: '24 checks',
      content: (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Validation Progress</div>
              <div style={{ fontSize: '12px', color: '#666' }}>18 of 24 complete</div>
            </div>
            <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px' }}>
              <div style={{ height: '100%', width: '75%', background: '#2e7d32', borderRadius: '4px' }} />
            </div>
          </div>

          {[
            { category: 'Customer Data', items: [
              { name: 'Customer count matches reconciliation', status: 'pass' },
              { name: 'Sample 10 customers - all fields correct', status: 'pass' },
              { name: 'Customer balances match AR aging', status: 'pass' },
              { name: 'Credit limits migrated correctly', status: 'pending' },
            ]},
            { category: 'Financial Data', items: [
              { name: 'AR balance matches QuickBooks', status: 'pass' },
              { name: 'AP balance matches QuickBooks', status: 'pass' },
              { name: 'Open invoice count correct', status: 'pass' },
              { name: 'Payment terms preserved', status: 'pass' },
            ]},
            { category: 'Inventory', items: [
              { name: 'Item count matches', status: 'pass' },
              { name: 'On-hand quantities correct', status: 'pending' },
              { name: 'Costs migrated accurately', status: 'pending' },
            ]},
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#666' }}>{section.category}</div>
              {section.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: j % 2 === 0 ? '#fafafa' : '#fff', borderRadius: '4px', marginBottom: '4px' }}>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    background: item.status === 'pass' ? '#e8f5e9' : item.status === 'fail' ? '#ffebee' : '#fff3e0',
                    color: item.status === 'pass' ? '#2e7d32' : item.status === 'fail' ? '#d32f2f' : '#f5a623',
                  }}>
                    {item.status === 'pass' ? '✓' : item.status === 'fail' ? '✗' : '○'}
                  </span>
                  <span style={{ fontSize: '12px' }}>{item.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    },
  };

  // Project definitions
  const projects: Record<string, {
    title: string;
    totalPrice: number;
    timeline: string;
    traditional: string;
    phases: {
      id: string;
      name: string;
      duration: string;
      price: number;
      automated: boolean;
      description: string;
      deliverables: { name: string; id: string | null }[];
    }[];
  }> = {
    migration: {
      title: 'QuickBooks to NetSuite Migration',
      totalPrice: 6000,
      timeline: '2 weeks',
      traditional: '$25,000 - $40,000',
      phases: [
        { id: 'discovery', name: 'Phase 1: Discovery & Extraction', duration: 'Days 1-2', price: 400, automated: true, description: 'Extract all data and assess quality.', deliverables: [
          { name: 'Data Quality Assessment Report', id: 'data-quality-report' },
          { name: 'Field Mapping Template', id: 'field-mapping' },
          { name: 'Anomaly Detection Report', id: null },
        ]},
        { id: 'mapping', name: 'Phase 2: Mapping Review', duration: 'Days 3-4', price: 800, automated: false, description: 'Review mappings and make decisions.', deliverables: [
          { name: 'Chart of Accounts Mapping', id: null },
          { name: 'Transaction Rollup Strategy', id: null },
          { name: 'Duplicate Handling Rules', id: null },
        ]},
        { id: 'test', name: 'Phase 3: Test Migration', duration: 'Days 5-7', price: 600, automated: true, description: 'Import to sandbox and validate.', deliverables: [
          { name: 'Reconciliation Report', id: 'reconciliation-report' },
          { name: 'Issue Resolution Log', id: null },
        ]},
        { id: 'validation', name: 'Phase 4: User Validation', duration: 'Days 8-10', price: 1200, automated: false, description: 'Your team reviews results.', deliverables: [
          { name: 'Validation Checklist', id: 'validation-checklist' },
          { name: 'Sign-off Documentation', id: null },
        ]},
        { id: 'cutover', name: 'Phase 5: Production Cutover', duration: 'Days 11-14', price: 3000, automated: false, description: 'Final import with supervision.', deliverables: [
          { name: 'Production Runbook', id: 'migration-runbook' },
          { name: 'Final Reconciliation', id: 'reconciliation-report' },
          { name: 'Knowledge Transfer Session', id: null },
        ]},
      ]
    },
    cleanup: {
      title: 'Data Cleanup & Deduplication',
      totalPrice: 2400,
      timeline: '1 week',
      traditional: '$8,000 - $15,000',
      phases: [
        { id: 'scan', name: 'Phase 1: Data Scan', duration: 'Day 1', price: 200, automated: true, description: 'Identify duplicates and issues.', deliverables: [
          { name: 'Duplicate Detection Report', id: 'data-quality-report' },
          { name: 'Merge Candidates List', id: null },
        ]},
        { id: 'rules', name: 'Phase 2: Merge Rules', duration: 'Day 2', price: 400, automated: false, description: 'Define merge rules.', deliverables: [
          { name: 'Merge Rule Definitions', id: null },
          { name: 'Exception Handling Plan', id: null },
        ]},
        { id: 'execute', name: 'Phase 3: Execute', duration: 'Days 3-5', price: 1000, automated: true, description: 'Automated cleanup.', deliverables: [
          { name: 'Audit Trail', id: null },
          { name: 'Rollback Capability', id: null },
        ]},
        { id: 'verify', name: 'Phase 4: Verification', duration: 'Days 6-7', price: 800, automated: false, description: 'Verify and handle exceptions.', deliverables: [
          { name: 'Verification Report', id: 'reconciliation-report' },
          { name: 'Final Data Quality Score', id: null },
        ]},
      ]
    },
  };

  // Deliverable Preview Modal
  const DeliverableModal = () => {
    if (!showDeliverableModal) return null;
    const preview = deliverablePreviews[showDeliverableModal];
    if (!preview) return null;

    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1002 }}>
        <div style={{ background: '#fff', borderRadius: '12px', width: '95%', maxWidth: '800px', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f8f8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>{preview.type === 'PDF' ? '📄' : preview.type === 'Excel' ? '📊' : '✅'}</span>
              <div>
                <div style={{ fontWeight: '600', fontSize: '15px' }}>{preview.title}</div>
                <div style={{ fontSize: '11px', color: '#666' }}>{preview.type} • {preview.pages} {typeof preview.pages === 'number' ? 'pages' : ''}</div>
              </div>
            </div>
            <button onClick={() => setShowDeliverableModal(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
          </div>
          <div style={{ padding: '20px', overflow: 'auto', flex: 1, background: '#fafafa' }}>
            <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              {preview.content}
            </div>
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', background: '#f8f8f8' }}>
            <div style={{ fontSize: '11px', color: '#666' }}>This is a preview. Actual deliverable will include complete data.</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button small>Download Sample</Button>
              <Button small primary onClick={() => setShowDeliverableModal(null)}>Close</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Phase Card with deliverable previews
  const PhaseCard = ({ phase, onActivate, onViewDetails, isActive, progress }: {
    phase: typeof projects.migration.phases[0];
    onActivate: (id: string) => void;
    onViewDetails: (phase: typeof projects.migration.phases[0]) => void;
    isActive: boolean;
    progress?: number;
  }) => (
    <div style={{
      border: isActive ? '2px solid #2e7d32' : '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '14px',
      marginBottom: '12px',
      background: isActive ? '#f9fdf9' : '#fff',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>{phase.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{phase.duration}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: '700', fontSize: '16px' }}>${phase.price.toLocaleString()}</div>
          <span style={{
            fontSize: '10px',
            padding: '2px 8px',
            borderRadius: '4px',
            background: phase.automated ? '#e3f2fd' : '#fff3e0',
            color: phase.automated ? '#1976d2' : '#e65100',
          }}>
            {phase.automated ? 'AI AUTOMATED' : 'HUMAN EXPERT'}
          </span>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>{phase.description}</div>

      {isActive && progress !== undefined && (
        <ProgressBar progress={progress} label={progress === 100 ? 'Completed' : 'In Progress...'} />
      )}

      <div style={{ fontSize: '12px', marginBottom: '12px' }}>
        <div style={{ fontWeight: '500', marginBottom: '6px' }}>Deliverables:</div>
        {phase.deliverables.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <CheckItem checked={isActive && progress === 100}>{d.name}</CheckItem>
            {d.id && (
              <button
                onClick={(e) => { e.stopPropagation(); setShowDeliverableModal(d.id); }}
                style={{ fontSize: '10px', color: '#1976d2', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Preview
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <Button small onClick={() => onViewDetails(phase)}>View Details</Button>
        {!isActive ? (
          <Button small primary onClick={() => onActivate(phase.id)}>Start Phase (${phase.price.toLocaleString()})</Button>
        ) : progress === 100 ? (
          <Button small success disabled>✓ Completed</Button>
        ) : (
          <Button small disabled>In Progress...</Button>
        )}
      </div>
    </div>
  );

  // NDA Modal
  const NDAModal = () => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflow: 'auto' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: '600' }}>Non-Disclosure Agreement</span>
          <button onClick={() => setShowNDAModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ background: '#f8f8f8', padding: '12px', borderRadius: '6px', fontSize: '12px', marginBottom: '16px' }}>
            <strong>Key Terms:</strong> AES-256 encryption • No permanent storage • SOC 2 Type II • 3-year term
          </div>
          <input type="text" placeholder="Full Name" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '8px' }} />
          <input type="email" placeholder="Email" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '8px' }} />
          <input type="text" placeholder="Company" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '12px' }} />
          <label style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
            <input type="checkbox" />
            <span>I agree to the NDA terms</span>
          </label>
        </div>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button onClick={() => setShowNDAModal(false)}>Cancel</Button>
          <Button primary onClick={() => { setNdaSigned(true); setShowNDAModal(false); }}>Sign</Button>
        </div>
      </div>
    </div>
  );

  // Call Modal
  const CallModal = () => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '450px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: '600' }}>Talk to Our Team</span>
          <button onClick={() => setShowCallModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ padding: '20px' }}>
          {callReason && <div style={{ padding: '10px', background: '#e3f2fd', borderRadius: '6px', marginBottom: '12px', fontSize: '12px' }}><strong>Topic:</strong> {callReason}</div>}
          <select style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '12px' }} onChange={(e) => setCallReason(e.target.value)} value={callReason}>
            <option value="">Select topic...</option>
            <option>Scope of Work Review</option>
            <option>Pricing Questions</option>
            <option>Technical Questions</option>
            <option>Custom Project</option>
          </select>
          {[
            { icon: '📞', title: 'Call Now', sub: '+1 (888) 555-0123' },
            { icon: '📅', title: 'Schedule', sub: 'Next: Today 2:30 PM' },
            { icon: '💬', title: 'Chat', sub: '● Online now' },
          ].map((opt, i) => (
            <div key={i} style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>{opt.icon}</span>
                <span style={{ fontWeight: '500' }}>{opt.title}</span>
              </div>
              <span style={{ fontSize: '13px', color: '#666' }}>{opt.sub}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid #e0e0e0', background: '#fafafa' }}>
          <Button onClick={() => { setShowCallModal(false); setCallReason(''); }}>Close</Button>
        </div>
      </div>
    </div>
  );

  // SOW Modal with deliverable previews
  const SOWModal = () => {
    const project = projects[sowType];
    const activatedTotal = Object.keys(activePhases).filter(k => activePhases[k]).reduce((sum, k) => {
      const phase = project.phases.find(p => p.id === k);
      return sum + (phase ? phase.price : 0);
    }, 0);

    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ background: '#fff', borderRadius: '12px', width: '95%', maxWidth: '900px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>Scope of Work</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{project.title}</div>
            </div>
            <button onClick={() => setShowSOWModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
          </div>

          <div style={{ padding: '20px', overflow: 'auto', flex: 1 }}>
            {/* Summary Cards */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '140px', padding: '14px', background: '#f8f8f8', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: '#666' }}>FULL PROJECT</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>${project.totalPrice.toLocaleString()}</div>
                <div style={{ fontSize: '10px', color: '#999', textDecoration: 'line-through' }}>{project.traditional}</div>
              </div>
              <div style={{ flex: 1, minWidth: '140px', padding: '14px', background: '#f8f8f8', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: '#666' }}>TIMELINE</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{project.timeline}</div>
              </div>
              <div style={{ flex: 1, minWidth: '140px', padding: '14px', background: activatedTotal > 0 ? '#e8f5e9' : '#f8f8f8', borderRadius: '8px', border: activatedTotal > 0 ? '1px solid #81c784' : 'none' }}>
                <div style={{ fontSize: '11px', color: activatedTotal > 0 ? '#2e7d32' : '#666' }}>ACTIVATED</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: activatedTotal > 0 ? '#2e7d32' : '#333' }}>${activatedTotal.toLocaleString()}</div>
              </div>
              <div style={{ flex: 1, minWidth: '140px', padding: '14px', background: '#fff9e6', borderRadius: '8px', border: '1px solid #ffe066' }}>
                <div style={{ fontSize: '11px', color: '#8a6d00' }}>GUARANTEE</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#8a6d00' }}>100% Money Back</div>
              </div>
            </div>

            {/* Deliverable Previews Quick Access */}
            <div style={{ marginBottom: '20px', padding: '14px', background: '#f5faff', borderRadius: '8px', border: '1px solid #64b5f6' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '10px', color: '#1976d2' }}>📄 Preview Sample Deliverables</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.entries(deliverablePreviews).slice(0, 4).map(([id, preview]) => (
                  <button
                    key={id}
                    onClick={() => setShowDeliverableModal(id)}
                    style={{ padding: '6px 12px', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}
                  >
                    {preview.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Phases */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: '600' }}>Project Phases</span>
                <Button small primary onClick={() => {
                  const allActive: Record<string, boolean> = {};
                  project.phases.forEach(p => allActive[p.id] = true);
                  setActivePhases(allActive);
                }}>Start All (${project.totalPrice.toLocaleString()})</Button>
              </div>

              {project.phases.map((phase) => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  isActive={activePhases[phase.id]}
                  progress={phaseProgress[phase.id]}
                  onActivate={(id) => setActivePhases(prev => ({ ...prev, [id]: true }))}
                  onViewDetails={(p) => setShowPhaseModal(p)}
                />
              ))}
            </div>
          </div>

          <div style={{ padding: '16px 20px', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', background: '#fafafa', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button outline>Download PDF</Button>
              <Button outline onClick={() => { setCallReason('Scope of Work Review'); setShowCallModal(true); }}>📞 Discuss</Button>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button onClick={() => setShowSOWModal(false)}>Close</Button>
              <Button primary onClick={() => {
                const allActive: Record<string, boolean> = {};
                project.phases.forEach(p => allActive[p.id] = true);
                setActivePhases(allActive);
              }}>Accept (${project.totalPrice.toLocaleString()})</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Phase Detail Modal
  const PhaseDetailModal = () => {
    if (!showPhaseModal) return null;
    const phase = showPhaseModal;

    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
        <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '550px', maxHeight: '80vh', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '600' }}>{phase.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{phase.duration} • ${phase.price}</div>
            </div>
            <button onClick={() => setShowPhaseModal(null)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>×</button>
          </div>
          <div style={{ padding: '20px', overflow: 'auto', maxHeight: '60vh' }}>
            <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '4px', background: phase.automated ? '#e3f2fd' : '#fff3e0', color: phase.automated ? '#1976d2' : '#e65100' }}>
              {phase.automated ? '🤖 AI AUTOMATED' : '👤 HUMAN EXPERT'}
            </span>

            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
              <div style={{ fontWeight: '500', marginBottom: '8px' }}>Description</div>
              <div style={{ fontSize: '13px', color: '#666' }}>{phase.description}</div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: '500', marginBottom: '8px' }}>Deliverables</div>
              {phase.deliverables.map((d: { name: string; id: string | null }, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', background: i % 2 === 0 ? '#fafafa' : '#fff', borderRadius: '4px' }}>
                  <span style={{ fontSize: '13px' }}>📄 {d.name}</span>
                  {d.id && (
                    <Button small onClick={() => setShowDeliverableModal(d.id)}>Preview</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', background: '#fafafa' }}>
            <Button onClick={() => { setCallReason(`Questions about ${phase.name}`); setShowCallModal(true); }}>📞 Ask Questions</Button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button onClick={() => setShowPhaseModal(null)}>Close</Button>
              {!activePhases[phase.id] && (
                <Button primary onClick={() => { setActivePhases(prev => ({ ...prev, [phase.id]: true })); setShowPhaseModal(null); }}>
                  Start (${phase.price})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Simplified render functions
  const renderOnboarding = () => {
    const steps = [
      <MessageBubble key={0} isUser={false}>
        <div style={{ marginBottom: '12px' }}><strong>Welcome to Source.</strong></div>
        <div style={{ marginBottom: '12px' }}>I help mid-market companies manage their ERP systems without expensive consultants.</div>
        <SystemCard actions={<><Button primary onClick={() => setOnboardingStep(1)}>Connect Your ERP</Button><Button outline onClick={() => setShowCallModal(true)}>Talk to Us</Button></>}>
          <div style={{ fontSize: '13px', color: '#666' }}>Connect your system to unlock scanning, analysis, and automated changes.</div>
        </SystemCard>
      </MessageBubble>,
      <React.Fragment key="step1"><MessageBubble key={1} isUser={true}>I want to connect my NetSuite system.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title="Security" info><div style={{ fontSize: '13px' }}>• AES-256 encryption • No permanent storage • Read-only default • Full audit logging</div></SystemCard>
        <SystemCard title="NDA Required" warning actions={ndaSigned ? <span style={{ color: '#2e7d32' }}>✓ Signed</span> : <><Button primary onClick={() => setShowNDAModal(true)}>Sign NDA</Button></>}>
          <div style={{ fontSize: '13px', color: '#666' }}>Required before accessing your data.</div>
        </SystemCard>
        {ndaSigned && <Button primary onClick={() => setOnboardingStep(2)}>Continue</Button>}
      </MessageBubble></React.Fragment>,
      <MessageBubble key={2} isUser={false}>
        <SystemCard title="Credentials">
          <input type="text" placeholder="Account ID" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '8px' }} />
          <input type="text" placeholder="Consumer Key" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '8px' }} />
          <input type="password" placeholder="Token Secret" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
        </SystemCard>
        <div style={{ display: 'flex', gap: '8px' }}><Button>Test</Button><Button primary onClick={() => { setOnboardingStep(3); setConnected(true); }}>Connect</Button></div>
      </MessageBubble>,
      <MessageBubble key={3} isUser={false}>
        <div style={{ padding: '12px', background: '#e8f5e9', borderRadius: '6px', marginBottom: '16px' }}>
          <span style={{ color: '#2e7d32', fontWeight: '600' }}>✓ Connected: ACME-CORP-PROD</span>
        </div>
        <SystemCard title="Scan Complete" success>Found: 3 critical, 7 warnings, 12 suggestions</SystemCard>
        <Button primary onClick={() => setCurrentDemo('discovery')}>View Results</Button>
      </MessageBubble>
    ];
    return steps.slice(0, onboardingStep + 1);
  };

  const renderDiscovery = () => (
    <>
      <MessageBubble isUser={true}>Give me a full health check.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title="System Health: 67/100">
          <ProgressBar progress={67} />
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', marginBottom: '12px' }}>
            <span style={{ color: '#d32f2f' }}>3 Critical</span>
            <span style={{ color: '#f57c00' }}>7 Warnings</span>
            <span>12 Suggestions</span>
          </div>
          {[
            { title: 'Shopify Integration Failing', detail: '47 orders stuck' },
            { title: '340 Duplicate Customers', detail: '12% of base' },
          ].map((issue, i) => (
            <div key={i} style={{ padding: '10px', background: '#fafafa', borderRadius: '4px', marginBottom: '8px' }}>
              <div style={{ fontWeight: '500' }}>{i + 1}. {issue.title}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{issue.detail}</div>
            </div>
          ))}
        </SystemCard>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button>Download PDF</Button>
          <Button onClick={() => { setSowType('cleanup'); setShowSOWModal(true); }}>Start Cleanup Project</Button>
        </div>
      </MessageBubble>
    </>
  );

  const renderAdmin = () => (
    <>
      <MessageBubble isUser={true}>Add a &quot;Customer Priority&quot; dropdown to Customer records.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title="Proposed Change">
          <div style={{ fontSize: '13px' }}>Field: Customer Priority • Type: Dropdown • Values: Standard, Silver, Gold, Platinum</div>
        </SystemCard>
        <Button primary onClick={() => setExecutionStep(1)}>Create in Sandbox</Button>
      </MessageBubble>
      {executionStep >= 1 && (
        <MessageBubble isUser={false}>
          <SystemCard title={executionStep >= 4 ? '✓ Created' : 'Creating...'} success={executionStep >= 4}>
            <ExecutionProgress currentStep={executionStep} steps={[{ label: 'Creating list' }, { label: 'Creating field' }, { label: 'Deploying' }, { label: 'Validating' }]} />
          </SystemCard>
          {executionStep >= 4 && <Button primary>Deploy to Production</Button>}
        </MessageBubble>
      )}
    </>
  );

  const renderScript = () => (
    <>
      <MessageBubble isUser={true}>Create a script that blocks orders when customer is on credit hold.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title="Script Plan"><div style={{ fontSize: '13px' }}>Type: User Event • Trigger: beforeSubmit • Record: Sales Order</div></SystemCard>
        <CodeBlock language="SuiteScript 2.1" code={`define(['N/record', 'N/error'], (record, error) => {
  const beforeSubmit = (ctx) => {
    if (customer.credithold === 'ON') throw error.create({ name: 'HOLD' });
  };
  return { beforeSubmit };
});`} />
        <Button primary onClick={() => setExecutionStep(1)}>Deploy & Test</Button>
      </MessageBubble>
      {executionStep >= 1 && (
        <MessageBubble isUser={false}>
          <SystemCard title={executionStep >= 5 ? '✓ Deployed' : 'Deploying...'} success={executionStep >= 5}>
            <ExecutionProgress currentStep={executionStep} steps={[{ label: 'Creating' }, { label: 'Uploading' }, { label: 'Deploying' }, { label: 'Testing' }, { label: 'Verifying' }]} />
          </SystemCard>
          {executionStep >= 5 && <Button primary>Deploy to Production</Button>}
        </MessageBubble>
      )}
    </>
  );

  const renderBrowser = () => (
    <>
      <MessageBubble isUser={true}>Test our inventory lookup Suitelet.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title={browserStep >= 6 ? '✓ Test Complete' : 'Running Browser Test...'} success={browserStep >= 6}>
          <ExecutionProgress currentStep={browserStep} steps={[{ label: 'Launching' }, { label: 'Authenticating' }, { label: 'Navigating' }, { label: 'Testing' }, { label: 'Verifying' }, { label: 'Screenshot' }]} />
          {browserStep === 0 && <div style={{ marginTop: '12px' }}><Button primary onClick={() => setBrowserStep(1)}>Start Test</Button></div>}
        </SystemCard>
        {browserStep >= 6 && <SystemCard title="Results" success><CheckItem checked>All tests passed</CheckItem></SystemCard>}
      </MessageBubble>
    </>
  );

  const renderIntegration = () => (
    <>
      <MessageBubble isUser={true}>Our Shopify integration stopped. Fix it.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title="Root Cause" warning>
          <div style={{ fontWeight: '500' }}>Shopify API token expired Jan 24</div>
          <div style={{ fontSize: '12px', color: '#666' }}>47 orders stuck</div>
        </SystemCard>
        <SystemCard title="Fix">
          <input type="password" placeholder="New Shopify token" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
        </SystemCard>
        <Button primary>Update & Sync</Button>
      </MessageBubble>
    </>
  );

  const renderDuplicates = () => (
    <>
      <MessageBubble isUser={true}>Clean up our duplicate customers.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title="Duplicate Analysis">
          <div style={{ fontSize: '13px' }}>340 duplicates found (12% of customer base)</div>
        </SystemCard>
        <SystemCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '8px' }}>
            <div><strong>Quick Clean</strong><br/><span style={{ fontSize: '12px', color: '#666' }}>Auto-merge obvious duplicates</span></div>
            <Button small primary>$200</Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}>
            <div><strong>Full Project</strong><br/><span style={{ fontSize: '12px', color: '#666' }}>Comprehensive with review</span></div>
            <Button small onClick={() => { setSowType('cleanup'); setShowSOWModal(true); }}>$2,400</Button>
          </div>
        </SystemCard>
      </MessageBubble>
    </>
  );

  const renderReports = () => (
    <>
      <MessageBubble isUser={true}>Create a saved search for overdue invoices by customer.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title="Saved Search">
          <div style={{ fontSize: '13px' }}>Type: Invoice • Filter: Open & Overdue • Columns: Customer, Amount, Days, Bucket</div>
        </SystemCard>
        <Button primary onClick={() => setExecutionStep(1)}>Create Search</Button>
      </MessageBubble>
      {executionStep >= 1 && (
        <MessageBubble isUser={false}>
          <SystemCard title={executionStep >= 3 ? '✓ Created' : 'Creating...'} success={executionStep >= 3}>
            <ExecutionProgress currentStep={executionStep} steps={[{ label: 'Building criteria' }, { label: 'Adding columns' }, { label: 'Saving' }]} />
          </SystemCard>
          {executionStep >= 3 && <BrowserPreview url="https://system.netsuite.com/search" content={<div style={{ fontSize: '11px' }}>Overdue Invoices: 89 results | $234,567 total</div>} />}
        </MessageBubble>
      )}
    </>
  );

  const renderWorkflow = () => (
    <>
      <MessageBubble isUser={true}>Create a workflow that routes POs over $10K to director approval.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title="Workflow Design">
          <div style={{ fontSize: '13px' }}>Trigger: PO {'>'} $10K → Status: Pending → Email Director → On Approve: Release</div>
        </SystemCard>
        <Button primary onClick={() => setExecutionStep(1)}>Create Workflow</Button>
      </MessageBubble>
      {executionStep >= 1 && (
        <MessageBubble isUser={false}>
          <SystemCard title={executionStep >= 4 ? '✓ Active' : 'Creating...'} success={executionStep >= 4}>
            <ExecutionProgress currentStep={executionStep} steps={[{ label: 'Creating' }, { label: 'Adding states' }, { label: 'Email template' }, { label: 'Activating' }]} />
          </SystemCard>
          {executionStep >= 4 && <Button primary>Deploy to Production</Button>}
        </MessageBubble>
      )}
    </>
  );

  const renderRFP = () => (
    <>
      <MessageBubble isUser={true}>Create an RFP for evaluating new ERP systems.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title="✓ RFP Generated" success>
          <div style={{ fontSize: '13px' }}>24-page RFP based on your current system analysis</div>
          <div style={{ marginTop: '8px', padding: '10px', background: '#f8f8f8', borderRadius: '6px', fontSize: '12px' }}>
            Key requirements: Multi-subsidiary (3) • 6 integrations • 12 scripts • 200+ custom fields
          </div>
        </SystemCard>
        <div style={{ display: 'flex', gap: '8px' }}><Button primary>Download DOCX</Button><Button>Send to Vendors</Button></div>
      </MessageBubble>
    </>
  );

  const renderHandoff = () => (
    <>
      <MessageBubble isUser={true}>We&apos;re acquiring a company on QuickBooks. Need to migrate into our NetSuite.</MessageBubble>
      <MessageBubble isUser={false}>
        <SystemCard title="Complex Migration Project" warning>
          <div style={{ fontSize: '13px', color: '#666' }}>This requires human expertise for key decisions.</div>
        </SystemCard>
        <SystemCard title="Summary">
          <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
            <div><div style={{ fontSize: '24px', fontWeight: '700' }}>$6,000</div><div style={{ fontSize: '11px', color: '#666' }}>Fixed Price</div></div>
            <div><div style={{ fontSize: '24px', fontWeight: '700' }}>2 wks</div><div style={{ fontSize: '11px', color: '#666' }}>Timeline</div></div>
          </div>
          <div style={{ padding: '10px', background: '#fff9e6', borderRadius: '6px', fontSize: '12px' }}>
            <strong>100% Money-Back Guarantee</strong> if we miss the deadline
          </div>
        </SystemCard>

        {/* Deliverable preview teaser */}
        <SystemCard title="Sample Deliverables" info>
          <div style={{ fontSize: '12px', marginBottom: '10px' }}>Click to preview what you&apos;ll receive:</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['data-quality-report', 'field-mapping', 'reconciliation-report'].map(id => (
              <button
                key={id}
                onClick={() => setShowDeliverableModal(id)}
                style={{ padding: '8px 12px', background: '#fff', border: '1px solid #ddd', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                📄 {deliverablePreviews[id].title}
              </button>
            ))}
          </div>
        </SystemCard>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button primary onClick={() => { setSowType('migration'); setShowSOWModal(true); }}>View Full Scope of Work</Button>
          <Button onClick={() => { setCallReason('Migration Project'); setShowCallModal(true); }}>📞 Talk to Expert</Button>
        </div>
      </MessageBubble>
    </>
  );

  const renderContent = () => {
    switch (currentDemo) {
      case 'onboarding': return renderOnboarding();
      case 'discovery': return renderDiscovery();
      case 'admin': return renderAdmin();
      case 'script': return renderScript();
      case 'browser': return renderBrowser();
      case 'integration': return renderIntegration();
      case 'duplicates': return renderDuplicates();
      case 'reports': return renderReports();
      case 'workflow': return renderWorkflow();
      case 'rfp': return renderRFP();
      case 'handoff': return renderHandoff();
      default: return renderOnboarding();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '16px' }}>
      {showNDAModal && <NDAModal />}
      {showCallModal && <CallModal />}
      {showSOWModal && <SOWModal />}
      {showPhaseModal && <PhaseDetailModal />}
      {showDeliverableModal && <DeliverableModal />}

      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ fontWeight: '600', fontSize: '18px' }}>SOURCE</div>
          {connected && <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#666' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4caf50' }} />ACME-CORP</div>}
        </div>

        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => {
                setCurrentDemo(demo.id);
                setExecutionStep(0);
                setBrowserStep(0);
                if (demo.id === 'onboarding') { setOnboardingStep(0); setConnected(false); setNdaSigned(false); }
              }}
              style={{
                padding: '5px 12px',
                borderRadius: '14px',
                border: currentDemo === demo.id ? '1px solid #333' : '1px solid #ddd',
                background: currentDemo === demo.id ? '#333' : '#fff',
                color: currentDemo === demo.id ? '#fff' : '#333',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              {demo.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <div style={{ padding: '16px', minHeight: '400px', maxHeight: '550px', overflow: 'auto' }}>{renderContent()}</div>
          <div style={{ borderTop: '1px solid #e0e0e0', padding: '12px', display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="Type your message..." style={{ flex: 1, padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }} />
            <button style={{ padding: '10px 18px', background: '#333', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Send</button>
          </div>
        </div>

        <div style={{ marginTop: '12px', padding: '10px 14px', background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '11px', color: '#666' }}>
          <strong>Demo:</strong> Click &quot;Preview&quot; on deliverables to see sample documents. Open SOW to activate individual phases.
        </div>
      </div>
    </div>
  );
};

export default function DemoPage() {
  return <SourceChatDemo />;
}
