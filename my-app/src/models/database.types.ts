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
      applications: {
        Row: {
          created_at: string
          id: string
          job_description_id: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_description_id: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          job_description_id?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_description_id_fkey"
            columns: ["job_description_id"]
            isOneToOne: false
            referencedRelation: "job_descriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          company_name: string
          created_at: string
          id: string
          link: string | null
          updated_at: string
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          link?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          link?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      cover_letter_sections: {
        Row: {
          content: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_descriptions: {
        Row: {
          company_id: string
          created_at: string
          id: string
          job_title_id: string | null
          link: string
          raw_text: string | null
          updated_at: string
          work_type: Database["public"]["Enums"]["WORK_TYPE"]
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          job_title_id?: string | null
          link: string
          raw_text?: string | null
          updated_at?: string
          work_type?: Database["public"]["Enums"]["WORK_TYPE"]
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          job_title_id?: string | null
          link?: string
          raw_text?: string | null
          updated_at?: string
          work_type?: Database["public"]["Enums"]["WORK_TYPE"]
        }
        Relationships: [
          {
            foreignKeyName: "job_descriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_descriptions_job_title_id_fkey"
            columns: ["job_title_id"]
            isOneToOne: false
            referencedRelation: "job_titles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_titles: {
        Row: {
          created_at: string
          id: string
          job_title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          job_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      office_locations: {
        Row: {
          created_at: string
          id: number
          location_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          location_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          location_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sections_tags: {
        Row: {
          created_at: string
          section_id: string
          tag_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          section_id: string
          tag_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          section_id?: string
          tag_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sections_tags_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "cover_letter_sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          tag_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          tag_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          tag_name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      WORK_TYPE:
        | "Remote"
        | "Hybrid (4 in, 1 out)"
        | "Hybrid (3 in, 2 out)"
        | "Hybrid (2 in, 3 out)"
        | "Hybrid (1 in, 4 out)"
        | "Office"
        | "Hybrid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      WORK_TYPE: [
        "Remote",
        "Hybrid (4 in, 1 out)",
        "Hybrid (3 in, 2 out)",
        "Hybrid (2 in, 3 out)",
        "Hybrid (1 in, 4 out)",
        "Office",
        "Hybrid",
      ],
    },
  },
} as const
