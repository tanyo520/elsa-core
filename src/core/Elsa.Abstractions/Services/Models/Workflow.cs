using System.Collections.Generic;
using System.Linq;
using Elsa.Models;

namespace Elsa.Services.Models
{
    public class Workflow
    {
        public Workflow()
        {
            Activities = new List<IActivity>();
            Connections = new List<Connection>();
            ActivityPropertyValueProviders = new Dictionary<string, IDictionary<string, IActivityPropertyValueProvider>>();
        }

        public Workflow(
            string definitionId,
            int version,
            bool isSingleton,
            bool isDisabled,
            string? name,
            string? description,
            bool isLatest,
            bool isPublished,
            WorkflowPersistenceBehavior persistenceBehavior,
            bool deleteCompletedInstances,
            IEnumerable<IActivity> activities,
            IEnumerable<Connection> connections,
            IDictionary<string, IDictionary<string, IActivityPropertyValueProvider>> activityPropertyValueProviders)
        {
            DefinitionId = definitionId;
            Version = version;
            IsSingleton = isSingleton;
            IsDisabled = isDisabled;
            IsLatest = isLatest;
            IsPublished = isPublished;
            Name = name;
            Description = description;
            PersistenceBehavior = persistenceBehavior;
            DeleteCompletedInstances = deleteCompletedInstances;
            Activities = activities.ToList();
            Connections = connections.ToList();
            ActivityPropertyValueProviders = activityPropertyValueProviders;
        }

        public string DefinitionId { get; set; } = default!;
        public int Version { get; set; }
        public bool IsSingleton { get; set; }
        public bool IsDisabled { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool IsPublished { get; set; }
        public bool IsLatest { get; set; }
        public WorkflowPersistenceBehavior PersistenceBehavior { get; set; }
        public bool DeleteCompletedInstances { get; set; }
        public ICollection<IActivity> Activities { get; set; }

        public ICollection<Connection> Connections { get; set; }

        public IDictionary<string, IDictionary<string, IActivityPropertyValueProvider>> ActivityPropertyValueProviders
        {
            get;
            set;
        }
    }
}