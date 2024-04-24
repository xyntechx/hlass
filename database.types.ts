export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      class_instances: {
        Row: {
          class_id: string | null
          id: string
          professors: string[] | null
          semester: string | null
        }
        Insert: {
          class_id?: string | null
          id?: string
          professors?: string[] | null
          semester?: string | null
        }
        Update: {
          class_id?: string | null
          id?: string
          professors?: string[] | null
          semester?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_class_instances_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          avg_content_rating: number | null
          avg_rating_difficulty: number | null
          avg_rating_overall: number | null
          avg_rating_professor: number | null
          class_level: string
          class_name: string
          class_overview: string | null
          id: string
          prerequisites: string[] | null
          review_count: number | null
          units: number
        }
        Insert: {
          avg_content_rating?: number | null
          avg_rating_difficulty?: number | null
          avg_rating_overall?: number | null
          avg_rating_professor?: number | null
          class_level: string
          class_name: string
          class_overview?: string | null
          id: string
          prerequisites?: string[] | null
          review_count?: number | null
          units: number
        }
        Update: {
          avg_content_rating?: number | null
          avg_rating_difficulty?: number | null
          avg_rating_overall?: number | null
          avg_rating_professor?: number | null
          class_level?: string
          class_name?: string
          class_overview?: string | null
          id?: string
          prerequisites?: string[] | null
          review_count?: number | null
          units?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bookmarked_class_ids: string[] | null
          email: string
          full_name: string | null
          grad_year: number | null
          id: string
        }
        Insert: {
          bookmarked_class_ids?: string[] | null
          email: string
          full_name?: string | null
          grad_year?: number | null
          id: string
        }
        Update: {
          bookmarked_class_ids?: string[] | null
          email?: string
          full_name?: string | null
          grad_year?: number | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          attendance_policy: string | null
          class_id: string
          comments: string | null
          cons: string | null
          created_at: string
          exam_format: string | null
          id: string
          num_exams: string | null
          professor: string
          profile_id: string
          pros: string | null
          rating_content: number
          rating_difficulty: number
          rating_overall: number
          rating_professor: number
          semester: string
          workload: string | null
        }
        Insert: {
          attendance_policy?: string | null
          class_id: string
          comments?: string | null
          cons?: string | null
          created_at?: string
          exam_format?: string | null
          id?: string
          num_exams?: string | null
          professor: string
          profile_id: string
          pros?: string | null
          rating_content: number
          rating_difficulty: number
          rating_overall: number
          rating_professor: number
          semester: string
          workload?: string | null
        }
        Update: {
          attendance_policy?: string | null
          class_id?: string
          comments?: string | null
          cons?: string | null
          created_at?: string
          exam_format?: string | null
          id?: string
          num_exams?: string | null
          professor?: string
          profile_id?: string
          pros?: string | null
          rating_content?: number
          rating_difficulty?: number
          rating_overall?: number
          rating_professor?: number
          semester?: string
          workload?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
