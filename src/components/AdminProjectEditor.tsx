import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Plus, Trash2, X } from 'lucide-react';
import { Project } from '../types';

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  subtitle: z.string().optional(),
  description: z.string().min(10, 'Description needs at least 10 characters'),
  isPrivate: z.boolean(),
  year: z.string().min(4, 'Enter a valid year'),
  technologies: z.string(),
  features: z.string(),
  challenges: z.string(),
  phases: z.array(z.object({
    title: z.string().min(1, 'Phase title is required'),
    date: z.string(),
    description: z.string(),
    status: z.enum(['pending', 'in-progress', 'completed']),
  })).optional()
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface AdminProjectEditorProps {
  project: Project | null;
  onSave: (values: ProjectFormValues) => void;
  onCancel: () => void;
}

export default function AdminProjectEditor({ project, onSave, onCancel }: AdminProjectEditorProps) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? {
      id: project.id,
      title: project.title,
      subtitle: project.subtitle || '',
      description: project.description,
      isPrivate: project.isPrivate,
      year: project.year,
      technologies: project.technologies?.join(', ') || '',
      features: project.features?.join(', ') || '',
      challenges: project.challenges?.join(', ') || '',
      phases: [] // Assuming project phase is added for timeline builder
    } : {
      id: "proj-" + Math.random().toString(36).substring(2, 9),
      title: "",
      subtitle: "",
      description: "",
      isPrivate: false,
      year: new Date().getFullYear().toString(),
      technologies: "",
      features: "",
      challenges: "",
      phases: [] // Empty timeline phases
    }
  });

  const { fields: phaseFields, append: appendPhase, remove: removePhase } = useFieldArray({
    control,
    name: "phases"
  });

  return (
    <div className="bg-[#121212] p-6 rounded-3xl border border-[#e9c349]/30 shadow-[0_0_30px_rgba(233,195,73,0.05)]">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <h3 className="font-sans text-2xl font-black text-white">
          {project ? `Edit Record: ${project.id}` : 'Create New Record'}
        </h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-white font-mono text-xs">[ Cancel ]</button>
      </div>

      <form onSubmit={handleSubmit(onSave)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Project Title</label>
            <input 
              {...register('title')}
              className="w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-[#e9c349]"
            />
            {errors.title && <p className="text-red-400 text-xs font-mono">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Subtitle / Tagline</label>
            <input 
              {...register('subtitle')}
              className="w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-[#e9c349]"
            />
            {errors.subtitle && <p className="text-red-400 text-xs font-mono">{errors.subtitle.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Full Description</label>
          <textarea 
            {...register('description')}
            className="w-full h-32 bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-sans focus:border-[#e9c349]"
          />
          {errors.description && <p className="text-red-400 text-xs font-mono">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
             <label className="flex items-center gap-2 cursor-pointer font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              Private Status
             </label>
             <select
               {...register('isPrivate', { setValueAs: v => v === 'true' })}
               className="w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-[#e9c349]"
             >
               <option value="false">Public Asset</option>
               <option value="true">Private / Internal</option>
             </select>
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Launch Year</label>
            <input 
              {...register('year')}
              className="w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-[#e9c349]"
            />
            {errors.year && <p className="text-red-400 text-xs font-mono">{errors.year.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Technologies (comma separated)</label>
          <input 
            {...register('technologies')}
            className="w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-[#e9c349]"
          />
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Features (comma separated)</label>
          <input 
            {...register('features')}
            className="w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-[#e9c349]"
          />
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Challenges (comma separated)</label>
          <input 
            {...register('challenges')}
            className="w-full bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-[#e9c349]"
          />
        </div>

        {/* Timeline builder logic */}
        <div className="border border-white/10 p-6 rounded-2xl bg-[#080808] space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-sans text-xl font-bold text-white">Journey Timeline Builder</h4>
            <button 
              type="button" 
              onClick={() => appendPhase({ title: 'New Phase', date: '', description: '', status: 'pending' })}
              className="bg-white/5 hover:bg-[#e9c349]/20 hover:text-[#e9c349] px-3 py-1.5 rounded-full flex gap-2 items-center text-xs font-mono text-gray-400 transition"
            >
              <Plus size={14} /> Add Phase
            </button>
          </div>
          
          {phaseFields.length === 0 && (
            <p className="text-gray-500 text-xs font-mono italic">No phases added to the timeline yet.</p>
          )}

          {phaseFields.map((field, index) => (
             <div key={field.id} className="p-4 border border-white/5 rounded-xl bg-[#121212] space-y-4">
               <div className="flex justify-between items-start">
                 <h5 className="text-[#4edea3] font-mono text-[10px] uppercase tracking-widest">Phase {index + 1}</h5>
                 <button type="button" onClick={() => removePhase(index)} className="text-gray-500 hover:text-red-400 transition">
                   <X size={14} />
                 </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="font-mono text-[9px] text-gray-500 uppercase block mb-1">Phase Title</label>
                   <input 
                     {...register(`phases.${index}.title` as const)}
                     className="w-full bg-[#080808] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-[#4edea3]"
                   />
                   {errors.phases?.[index]?.title && <p className="text-red-400 text-[10px] lowercase">{errors.phases[index]?.title?.message}</p>}
                 </div>
                 <div>
                   <label className="font-mono text-[9px] text-gray-500 uppercase block mb-1">Date</label>
                   <input 
                     {...register(`phases.${index}.date` as const)}
                     className="w-full bg-[#080808] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-[#4edea3]"
                   />
                 </div>
               </div>
               
               <div>
                  <label className="font-mono text-[9px] text-gray-500 uppercase block mb-1">Status</label>
                  <select 
                     {...register(`phases.${index}.status` as const)}
                     className="w-full bg-[#080808] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-[#4edea3]"
                   >
                     <option value="pending">Pending</option>
                     <option value="in-progress">In Progress</option>
                     <option value="completed">Completed</option>
                   </select>
               </div>
               
               <div>
                 <label className="font-mono text-[9px] text-gray-500 uppercase block mb-1">Phase Description</label>
                 <textarea 
                   {...register(`phases.${index}.description` as const)}
                   className="w-full h-20 bg-[#080808] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-sans focus:border-[#4edea3]"
                 />
               </div>
             </div>
          ))}
        </div>

        <button type="submit" className="flex items-center gap-2 bg-[#e9c349] text-black px-6 py-3 rounded-xl font-mono text-xs font-bold hover:bg-[#ffe088] transition-all w-full md:w-auto">
          <Save size={14} /> Commit Changes to Array
        </button>
      </form>
    </div>
  );
}
