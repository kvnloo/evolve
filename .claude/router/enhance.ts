#!/usr/bin/env node
/**
 * Enhanced Router Integration
 * Combines confidence scoring, parallel analysis, and LLM fallback
 */

import { scoreConfidence, type ConfidenceScore } from './confidence-scorer';
import { analyzeParallelization, type ParallelStrategy } from './parallel-analyzer';
import { llmFallback, type LLMRoute } from './llm-fallback';

export interface TodoItem {
  id: string;
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  activeForm: string;
}

export interface EnhancedRoute {
  command: string;
  confidence: number;
  reasoning: string;
  alternatives?: string[];
  historicalSuccess?: number;
  parallelStrategy?: 'parallel' | 'sequential' | 'single_step';
  speedupEstimate?: string;
  todos?: TodoItem[];
  metadata?: {
    usedLLM: boolean;
    confidenceBreakdown: ConfidenceScore;
    parallelAnalysis?: ParallelStrategy;
  };
}

/**
 * Main enhancement function
 */
export async function enhanceRouting(
  baseRoute: string,
  request: string,
  context?: string[]
): Promise<EnhancedRoute> {
  try {
    // Step 1: Score confidence in base route
    const confidenceScore = await scoreConfidence(baseRoute, request, context);

    // Step 2: Analyze parallelization opportunities
    const parallelAnalysis = await analyzeParallelization(request, context);

    // Step 3: Determine if LLM fallback needed
    let finalRoute: string = baseRoute;
    let llmResult: LLMRoute | null = null;
    let usedLLM = false;

    if (confidenceScore.overall < 0.6) {
      console.error(`⚠️ Low confidence (${confidenceScore.overall.toFixed(2)}) - using LLM fallback`);
      llmResult = await llmFallback(request, baseRoute, context);
      finalRoute = llmResult.suggestedCommand;
      usedLLM = true;
    }

    // Step 4: Generate todos if multi-step
    const todos = generateTodos(parallelAnalysis, request);

    // Step 5: Combine results
    const enhancedRoute: EnhancedRoute = {
      command: finalRoute,
      confidence: usedLLM ? (llmResult?.confidence || 0.7) : confidenceScore.overall,
      reasoning: usedLLM
        ? llmResult?.reasoning || 'LLM-suggested route'
        : confidenceScore.reasoning,
      alternatives: usedLLM
        ? llmResult?.alternatives
        : identifyAlternatives(baseRoute, request),
      historicalSuccess: confidenceScore.historicalMatch,
      parallelStrategy: parallelAnalysis.strategy,
      speedupEstimate: parallelAnalysis.speedupEstimate,
      todos: todos.length > 0 ? todos : undefined,
      metadata: {
        usedLLM,
        confidenceBreakdown: confidenceScore,
        parallelAnalysis
      }
    };

    return enhancedRoute;

  } catch (error) {
    console.error('❌ Error in enhanceRouting:', error);

    // Fallback to base route with low confidence
    return {
      command: baseRoute,
      confidence: 0.3,
      reasoning: `Error during enhancement: ${error instanceof Error ? error.message : 'Unknown error'}. Falling back to base route.`,
      metadata: {
        usedLLM: false,
        confidenceBreakdown: {
          overall: 0.3,
          keywordMatch: 0.3,
          contextRelevance: 0.3,
          historicalMatch: 0,
          reasoning: 'Error fallback'
        }
      }
    };
  }
}

/**
 * Generate TodoItems from parallel analysis
 */
function generateTodos(parallelAnalysis: ParallelStrategy, request: string): TodoItem[] {
  if (parallelAnalysis.steps.length <= 1) {
    return [];
  }

  return parallelAnalysis.steps.map((step, index) => ({
    id: `step-${index + 1}`,
    content: step.description,
    status: 'pending' as const,
    priority: index === 0 ? 'high' as const : 'medium' as const,
    activeForm: step.description.replace(/^(.*?)(?:\s|$)/, (_, verb) =>
      verb.endsWith('e') ? `${verb.slice(0, -1)}ing` : `${verb}ing`
    )
  }));
}

/**
 * Identify alternative commands based on request
 */
function identifyAlternatives(baseRoute: string, request: string): string[] {
  const alternatives: string[] = [];
  const requestLower = request.toLowerCase();

  // Common alternative patterns
  const alternativeMap: Record<string, string[]> = {
    '/sc:implement': ['/sparc:coder', '/swarm:development'],
    '/sparc:coder': ['/sc:implement', '/swarm:development'],
    '/sc:analyze': ['/sparc:analyzer', '/swarm:analysis'],
    '/sc:test': ['/sparc:tdd', '/sparc:tester', '/swarm:testing'],
    '/sc:research': ['/sparc:researcher', '/swarm:research'],
    '/sc:troubleshoot': ['/sparc:debugger'],
    '/sc:design': ['/sparc:architect'],
    '/sc:document': ['/sparc:documenter']
  };

  // Add predefined alternatives
  if (alternativeMap[baseRoute]) {
    alternatives.push(...alternativeMap[baseRoute]);
  }

  // Context-based alternatives
  if (requestLower.includes('test') && !baseRoute.includes('test')) {
    alternatives.push('/sc:test', '/sparc:tdd');
  }
  if (requestLower.includes('optimize') && !baseRoute.includes('optim')) {
    alternatives.push('/sparc:optimizer');
  }
  if (requestLower.includes('research') && !baseRoute.includes('research')) {
    alternatives.push('/sc:research', '/sparc:researcher');
  }

  return [...new Set(alternatives)]; // Remove duplicates
}

/**
 * CLI interface
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: enhance.ts <baseRoute> <request> [context...]');
    process.exit(1);
  }

  const [baseRoute, request, ...context] = args;

  const result = await enhanceRouting(baseRoute, request, context);

  console.log(JSON.stringify(result, null, 2));
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}
