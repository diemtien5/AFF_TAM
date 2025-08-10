"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { LoanPackage } from "@/types"

export function useLoanPackages() {
  const [loanPackages, setLoanPackages] = useState<LoanPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLoanPackages()
  }, [])

  const fetchLoanPackages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("loan_packages")
        .select("*")
        .order("created_at", { ascending: true })

      if (error) throw error
      setLoanPackages(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch loan packages")
    } finally {
      setLoading(false)
    }
  }

  const addLoanPackage = async (packageData: Omit<LoanPackage, "id" | "created_at">) => {
    try {
      const { data, error } = await supabase
        .from("loan_packages")
        .insert([packageData])
        .select()
        .single()

      if (error) throw error
      setLoanPackages(prev => [...prev, data])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add loan package")
      throw err
    }
  }

  const updateLoanPackage = async (id: string, updates: Partial<LoanPackage>) => {
    try {
      const { data, error } = await supabase
        .from("loan_packages")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      setLoanPackages(prev => prev.map(pkg => pkg.id === id ? data : pkg))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update loan package")
      throw err
    }
  }

  const deleteLoanPackage = async (id: string) => {
    try {
      const { error } = await supabase
        .from("loan_packages")
        .delete()
        .eq("id", id)

      if (error) throw error
      setLoanPackages(prev => prev.filter(pkg => pkg.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete loan package")
      throw err
    }
  }

  return {
    loanPackages,
    loading,
    error,
    fetchLoanPackages,
    addLoanPackage,
    updateLoanPackage,
    deleteLoanPackage,
  }
}
